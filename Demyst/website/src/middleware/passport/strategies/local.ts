import PassportLocal from "passport-local";
import User, { IUser } from "../../../models/User";
import { AccessDenied } from "../../../errors";
import issueToken from "../issueToken";

interface IAuthData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export const local = new PassportLocal.Strategy(
  { usernameField: "login" },
  async (
    login: string,
    password: string,
    done: (error: any, user?: IAuthData) => void
  ) => {
    const user: IUser = await User.login(login, password);
    if (user) {
      const [accessToken, refreshToken] = await issueToken(user);
      return done(null, {
        user,
        accessToken,
        refreshToken,
      });
    }
    done(new AccessDenied());
  }
);

export default local;
