import axios, { AxiosResponse } from "axios";

import config from "config";
import { BusinessRulesResult } from "../rules/RuleTypes";
import { DecisionType } from "../../types/Decision";
import { ApplicationRequestType } from "../../types/ApplicationRequest";
import { mapToDecisionEngineRequest } from "./mappers";

export default async (
  application: ApplicationRequestType,
  rulesResult: BusinessRulesResult
): Promise<DecisionType> => {
  const request = mapToDecisionEngineRequest(application, rulesResult);
  let response: AxiosResponse;

  response = await axios.post(
    <string>config.get("remoteServices.decisionEngineApiUrl"),
    request
  );

  //map from the decision engine
  return <DecisionType>response.data;
};
