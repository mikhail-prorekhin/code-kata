import passport from "koa-passport";
export const jwt = passport.authenticate("jwt", { session: false });
