import config from "config";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "./../../../models/User";
import { AccessDenied } from "../../../errors";

export const jwt = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get("auth.jwt.secret"),
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(new AccessDenied());
      }
      done(null, { user });
    } catch (e) {
      done(e);
    }
  }
);

export default jwt;
