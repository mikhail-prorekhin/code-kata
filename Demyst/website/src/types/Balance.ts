import z from "zod";

export const BalancePerMonth = z.object({
  year: z.number(),
  month: z.number(),
  profitOrLoss: z.number(),
  assetsValue: z.number(),
});
export type BalancePerMonthType = z.infer<typeof BalancePerMonth>;

export const BalanceSheet = z.array(BalancePerMonth).length(12);
export type BalanceSheetType = z.infer<typeof BalanceSheet>;
