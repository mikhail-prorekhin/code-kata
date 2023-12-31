import z from "zod";
import { GWTData } from "./GWTData";

export const User = z.object({
  login: z.string(),
  gwt: GWTData,
});

export type UserType = z.infer<typeof User>;
