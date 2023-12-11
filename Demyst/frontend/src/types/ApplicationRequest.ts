import z from "zod";
import { Company } from "./Company";
import { BalanceSheet } from "./Balance";

export const ApplicationRequest = z.object({
  businessDetails: Company,
  balanceSheet: BalanceSheet,
  loanAmount: z.number().nonnegative(),
});

export type ApplicationRequestType = z.infer<typeof ApplicationRequest>;
