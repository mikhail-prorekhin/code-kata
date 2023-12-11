import z from "zod";

export const AccountProvider = z.enum(["myob", "xero"]);
export type AccountProviderType = z.infer<typeof AccountProvider>;
