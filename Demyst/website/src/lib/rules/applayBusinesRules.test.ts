import { asMockFunction } from "../../testing/helpers";
import { ApplicationRequestType } from "../../types/ApplicationRequest";
import { BusinessRulesResult } from "./RuleTypes";
import applayBusinesRules from "./applayBusinesRules";
import preAssessmentRule from "./preAssessmentRule";

jest.mock("./preAssessmentRule");

describe("applayBusinesRules", () => {
  asMockFunction(preAssessmentRule).mockImplementation(
    (prev) =>
      ({
        ...prev,
        preAssessmentRule: "preAssessmentRule",
      } as unknown as BusinessRulesResult)
  );
  it("run all rules ", () => {
    expect(
      applayBusinesRules({
        initialData: "initialData",
      } as unknown as ApplicationRequestType)
    ).toEqual({
      initialData: "initialData",
      preAssessmentRule: "preAssessmentRule",
    });
  });
});
