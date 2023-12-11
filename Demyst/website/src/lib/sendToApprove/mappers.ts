import { ApplicationDecisionRequestType } from "../../types/ApplicationDecisionRequest";
import { ApplicationRequestType } from "../../types/ApplicationRequest";
import { BusinessRulesResult } from "../rules/RuleTypes";

export const mapToDecisionEngineRequest = (
  application: ApplicationRequestType,
  rulesResult: BusinessRulesResult
): ApplicationDecisionRequestType => ({
  businessDetails: application.businessDetails,
  profit: application.balanceSheet.reduce(
    (sum, itm) => sum + itm.profitOrLoss,
    0
  ),
  preAssessment: rulesResult.preAssessment,
});
