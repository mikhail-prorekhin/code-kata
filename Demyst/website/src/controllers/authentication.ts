import { RouterContext } from "koa-router";
import User, { IUser } from "../models/User";
import Token, { IToken } from "../models/Token";
import getProvider from "./oauth";
import { NotAuthorized } from "../errors";
import issueToken from "../middleware/passport/issueToken";

export async function register<IParamMiddleware>(
  ctx: RouterContext,
  next: () => Promise<any>
) {
  const { login, password } = ctx.request.body as IUser;
  const user = new User({ login, password });

  await user.save();

  const provider = getProvider("local");
  await provider(ctx, next);

  ctx.status = 201;
}

export async function oauth(ctx: RouterContext, next: () => Promise<any>) {
  const provider = getProvider(ctx.params.provider);
  await provider(ctx, next);
}

export async function oauthRedirect(
  ctx: RouterContext,
  next: () => Promise<any>
) {
  const provider = getProvider(ctx.params.provider);
  await provider(ctx, next);
  ctx.cookies.set("user_auth", JSON.stringify(ctx.response.body), {
    httpOnly: false,
  });
  ctx.redirect("/");
}

export async function refresh(ctx: RouterContext) {
  const { accessToken, refreshToken } = ctx.request.body as IToken;

  const token = await Token.findOneAndDelete({
    accessToken,
    refreshToken,
  }).exec();
  if (token) {
    const user = (await User.findById(token.sub)) as IUser;
    const [accessToken, refreshToken] = await issueToken(user);
    ctx.body = {
      accessToken,
      refreshToken,
    };
    return;
  }
  throw new NotAuthorized();
}

export async function logout(ctx: RouterContext) {
  const { accessToken, refreshToken } = ctx.request.body as IToken;

  const token = await Token.findOneAndDelete({
    accessToken,
    refreshToken,
  }).exec();
  // should put this token to a revoked table

  ctx.status = 200;
}

export const login = getProvider("local");
export * from "./oauth/jwt";
