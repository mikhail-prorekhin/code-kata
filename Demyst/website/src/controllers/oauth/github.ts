import passport from "koa-passport";
export default passport.authenticate("github", {
  session: false,
});
