import compose from "koa-compose";
import { RouterContext } from "koa-router";
import github from "./github";
import local from "./local";

const providers = {
  github,
  local,
};

export default function getProvider(name: string) {
  const provider = providers[name as keyof object];
  if (!provider) {
    throw new Error(`Provider ${name} not implemented`);
  }
  return compose([
    provider,
    (ctx: RouterContext) => {
      ctx.body = ctx.state.user;
    },
  ]);
}
