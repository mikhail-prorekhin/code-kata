import z from "zod";
import { Company } from "./Company";
import { BalanceSheet } from "./Balance";

export const ApplicationDecisionRequest = z.object({
  businessDetails: Company,
  profit: z.number(),
  preAssessment: z.number(),
});

export type ApplicationDecisionRequestType = z.infer<
  typeof ApplicationDecisionRequest
>;
