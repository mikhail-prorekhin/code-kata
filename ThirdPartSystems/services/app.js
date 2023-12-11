const auxLibs = require("./lib");
const Koa = require("koa");
const app = new Koa();

app.use(require("koa-bodyparser")());

const Router = require("koa-router");

const router = new Router();

router.post("/myob/balance", async (ctx) => {
  await new Promise((res) => setTimeout(res, 2000));
  ctx.response.status = 200;
  ctx.response.body = auxLibs.getResponseByEstYear(
    ctx.request.body.businessDetails.estYear
  );
});

router.post("/xero/balance", async (ctx) => {
  await new Promise((res) => setTimeout(res, 2000));
  ctx.response.status = 200;
  ctx.response.body = auxLibs.getResponseByEstYear(
    ctx.request.body.businessDetails.estYear
  );
});

router.post("/desigion/approve", async (ctx) => {
  await new Promise((res) => setTimeout(res, 2000));
  ctx.response.status = 200;
  ctx.response.body = {
    decision: auxLibs.approveAccount(ctx.request.body.profit),
  };
});

app.use(router.routes());

module.exports = app;
