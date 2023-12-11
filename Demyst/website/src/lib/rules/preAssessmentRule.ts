import { ApplicationRequestType } from "../../types/ApplicationRequest";
import { BusinessRulesResult } from "./RuleTypes";

export default (
  application: ApplicationRequestType,
  result: BusinessRulesResult
): BusinessRulesResult => {
  let preAssessment = 20;
  const profit = application.balanceSheet.reduce(
    (sum, { profitOrLoss }) => sum + profitOrLoss,
    0
  );
  if (profit > application.loanAmount) {
    preAssessment = 100;
  } else if (profit > 0) {
    preAssessment = 60;
  }
  return { ...result, preAssessment };
};
