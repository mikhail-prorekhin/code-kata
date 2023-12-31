import z from "zod";

export const GWTData = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type GWTDataType = z.infer<typeof GWTData>;
