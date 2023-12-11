import sendToApprove from "./sendToApprove";
import { mapToDecisionEngineRequest } from "./mappers";
import axios from "axios";
import { ApplicationRequestType } from "../../types/ApplicationRequest";
import { BusinessRulesResult } from "../rules/RuleTypes";
import { asMockFunction } from "../../testing/helpers";
import { ApplicationDecisionRequestType } from "../../types/ApplicationDecisionRequest";

jest.mock("axios");
jest.mock("./mappers");

describe("sendToApprove", () => {
  it("send", async () => {
    process.env.DECISION_ENGINE_API_URL = "--DECISION_ENGINE_API_URL--";
    axios.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: "--axios.post --" }));
    asMockFunction(mapToDecisionEngineRequest).mockReturnValue(
      "--mapped request--" as unknown as ApplicationDecisionRequestType
    );
    const application = "application" as unknown as ApplicationRequestType;
    const rulesResult = "rulesResult" as unknown as BusinessRulesResult;

    expect(await sendToApprove(application, rulesResult)).toBe(
      "--axios.post --"
    );
    expect(axios.post).toHaveBeenCalledWith(
      process.env.DECISION_ENGINE_API_URL,
      "--mapped request--"
    );
  });
});
