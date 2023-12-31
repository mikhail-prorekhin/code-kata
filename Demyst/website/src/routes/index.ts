import Router from "koa-router";
import {
  register,
  login,
  logout,
  jwt,
  oauth,
  oauthRedirect,
  refresh,
} from "./../controllers/authentication";
import getBalance from "./../controllers/getBalance";
import sendApplication from "./../controllers/sendApplication";

const router = new Router({ prefix: "/api" });

router.post("/register", register);
router.post("/refresh", refresh);
router.post("/login", login);
router.post("/logout", logout);

router.get("/oauth/:provider", oauth);
router.get("/oauth/:provider/callback", oauthRedirect);

router.post("/balance", jwt, getBalance);
router.post("/application", jwt, sendApplication);

export default router;
