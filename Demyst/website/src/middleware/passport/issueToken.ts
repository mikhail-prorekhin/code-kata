import config from "config";
import jwt, { Algorithm } from "jsonwebtoken";
import { v4 } from "uuid";
import Token from "../../models/Token";
import { IUser } from "../../models/User";

const TOKEN_SECRET: string = config.get("auth.jwt.secret");
const TOKEN_ALGORITHM: Algorithm = config.get(
  "auth.jwt.algorithm"
) as Algorithm;
const TOKEN_EXPIRES_IN: string = config.get("auth.jwt.expiresIn");

export default async function issueToken(user: IUser) {
  const accessToken = jwt.sign({ sub: user.id }, TOKEN_SECRET, {
    algorithm: TOKEN_ALGORITHM,
    expiresIn: TOKEN_EXPIRES_IN,
  });
  const refreshToken = v4();
  await Token.create({ accessToken, refreshToken, sub: user.id });
  return [accessToken, refreshToken];
}
