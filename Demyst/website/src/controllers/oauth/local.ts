import passport from "koa-passport";
export default passport.authenticate("local", { session: false });
