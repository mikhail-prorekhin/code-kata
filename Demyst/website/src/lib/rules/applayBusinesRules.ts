import { ApplicationRequestType } from "../../types/ApplicationRequest";
import { BusinessRulesResult, RuleMethod } from "./RuleTypes";
import preAssessmentRule from "./preAssessmentRule";

const rules = [preAssessmentRule];

export default (request: ApplicationRequestType) =>
  rules.reduce(
    (result: BusinessRulesResult, rule: RuleMethod) => rule(request, result),
    <BusinessRulesResult>{}
  );
