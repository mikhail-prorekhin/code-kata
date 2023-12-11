import { ApplicationRequestType } from "../../types/ApplicationRequest";

export type BusinessRulesResult = {
  preAssessment: number;
};

export type RuleMethod = (
  arg0: ApplicationRequestType,
  arg1: BusinessRulesResult
) => BusinessRulesResult;
