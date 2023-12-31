import path from "path";
import fs from "fs";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import koaStatic from "koa-static";

import passport from "./middleware/passport";
import routes from "./routes";

export default () => {
  const app = new Koa();

  app.use(koaStatic(path.join(__dirname, "public")));
  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(routes.middleware());

  const index = fs.readFileSync(path.join(__dirname, "public/index.html"));
  app.use(async (ctx) => {
    if (!ctx.url.startsWith("/api")) {
      ctx.set("content-type", "text/html");
      ctx.body = index;
    }
  });
  return app;
};
