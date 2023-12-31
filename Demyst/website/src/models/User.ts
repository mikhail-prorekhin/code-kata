import config from "config";
import { promisify } from "util";
import { pbkdf2, randomBytes } from "crypto";
import { Schema, HydratedDocument, Document, Model, model } from "mongoose";

const randomBytesPromise = promisify(randomBytes);
const pbkdf2Promise = promisify(pbkdf2);

const GLOBAL_SALT = config.get("auth.salt");
const USER_SALT_LENGTH: number = config.get("auth.userSaltLength");
const ITERATIONS: number = config.get("auth.iterations");
const HASH_LENGTH: number = config.get("auth.hashLength");
const HASH_ALGORITHM: string = config.get("auth.hashAlgorithm");

function createSalt() {
  return randomBytesPromise(USER_SALT_LENGTH).then((buffer) =>
    buffer.toString("hex")
  );
}

function createHash(password: string, salt: string) {
  return pbkdf2Promise(
    password,
    `${salt}${GLOBAL_SALT}`,
    ITERATIONS,
    HASH_LENGTH,
    HASH_ALGORITHM
  ).then((buffer) => buffer.toString("hex"));
}

function removeProperties(...properties: string[]) {
  return function (_: unknown, ret: object) {
    for (const prop of properties) {
      delete ret[prop as keyof object];
    }
    return ret;
  };
}

export interface IUser extends Document {
  name: string;
  login: string;
  password: string;
  salt: string;
  oauth: IOAuth[];
}

export interface IOAuth {
  _id?: string | false;
  provider: string;
  id: string;
  accessToken: string;
  refreshToken: string;
}

interface IUserMethods {
  checkPassword(): boolean;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
  login(
    login: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    oauth: [
      {
        _id: false,
        provider: { type: String, required: true },
        id: { type: String, required: true },
        accessToken: String,
        refreshToken: String,
      },
    ],
  },
  {
    toObject: {
      transform: removeProperties("password", "salt"),
    },
    toJSON: {
      transform: removeProperties("password", "salt"),
    },
  }
);

userSchema.static("login", async function (login, password) {
  const user = await this.findOne({ login }, {}).select("+password +salt");

  if (!user) {
    return false;
  }

  if (!(await user.checkPassword(password))) {
    return false;
  }
  return user;
});

userSchema.method("checkPassword", async function (password: string) {
  const hash = await createHash(password, this.salt);
  return hash === this.password;
});

userSchema.pre("save", async function (this: IUser) {
  if (this.isModified("password")) {
    this.salt = await createSalt();
    this.password = await createHash(this.password, this.salt);
  }
});

export default model<IUser, UserModel>("user", userSchema);
