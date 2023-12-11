import z from "zod";
import { Company } from "./Company";
import { AccountProvider } from "./AccountProvider";

export const BalanceSheetRequest = z.object({
  businessDetails: Company,
  accountProvider: AccountProvider,
  loanAmount: z.number().nonnegative(),
});

export type BalanceSheetRequestType = z.infer<typeof BalanceSheetRequest>;
