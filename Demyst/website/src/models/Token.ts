import config from "config";
import mongoose, { Schema, Document, model } from "mongoose";

export interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  sub: string;
  ts: Date;
}

const schema = new Schema<IToken>({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  sub: String,
  ts: {
    type: Date,
    default: new Date(),
  },
});

schema.index({ accessToken: 1, refreshToken: 1 });
schema.index({ ts: 1 }, { expires: config.get("auth.refreshToken.expiresIn") });

export default model("token", schema);
