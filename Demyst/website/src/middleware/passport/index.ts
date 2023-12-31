import passport from "koa-passport";
import { local, github, jwt } from "./strategies";

passport.use(local);
passport.use(github);
passport.use(jwt);

export default passport;
