const path = require("path");
const fs = require("fs");
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import koaStatic from "koa-static";
import getBalance from "./controllers/getBalance";
import sendApplication from "./controllers/sendApplication";

const app = new Koa();
const router = new Router({ prefix: "/api" });

app.use(koaStatic(path.join(__dirname, "public")));
app.use(bodyParser());

router.post("/balance", getBalance);

router.post("/application", sendApplication);

app.use(router.routes());

const index = fs.readFileSync(path.join(__dirname, "public/index.html"));
app.use(async (ctx) => {
  if (!ctx.url.startsWith("/api")) {
    ctx.set("content-type", "text/html");
    ctx.body = index;
  }
});

export default app;
