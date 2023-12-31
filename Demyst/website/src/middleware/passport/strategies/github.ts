import config from "config";
import GitHubStrategy from "passport-github2";
import OAuth2Strategy from "passport-oauth2";
import User from "../../../models/User";
import issueToken from "../issueToken";

export const github = new GitHubStrategy.Strategy(
  {
    clientID: config.get("auth.github.clientId"),
    clientSecret: config.get("auth.github.secret"),
    callbackURL: `http://localhost:${config.get(
      "app.port"
    )}/api/oauth/github/callback`,
    scope: ["user:email"],
  },
  async (
    ghAccessToken: string,
    ghRefreshToken: string,
    profile: any,
    done: OAuth2Strategy.VerifyCallback
  ) => {
    try {
      const ghUser = {
        oauth: [
          {
            id: profile.id,
            provider: "github",
            accessToken: ghAccessToken,
            refreshToken: ghRefreshToken,
          },
        ],
        name: profile.displayName || profile.username,
        login: profile.username,
      };
      const user = await User.findOneAndUpdate(
        { oauth: { $elemMatch: { provider: "github", id: profile.id } } },
        ghUser,
        {
          new: true,
          upsert: true,
        }
      );
      const [accessToken, refreshToken] = await issueToken(user);
      done(null, {
        user,
        accessToken,
        refreshToken,
      });
    } catch (e) {
      done(e as Error);
    }
  }
);

export default github;
