import { ApplicationRequestType } from "../../types/ApplicationRequest";
import { BusinessRulesResult } from "./RuleTypes";
import preAssessmentRule from "./preAssessmentRule";

describe("preAssessmentRule", () => {
  let application: ApplicationRequestType;
  let result: BusinessRulesResult;
  beforeEach(() => {
    result = { init: "~~init~~" } as unknown as BusinessRulesResult;
    application = {
      businessDetails: { companyName: "Horns and Hooves", estYear: 2020 },
      balanceSheet: [
        {
          year: 2023,
          month: 12,
          profitOrLoss: 1,
          assetsValue: 1234,
        },
        {
          year: 2023,
          month: 11,
          profitOrLoss: 2,
          assetsValue: 5789,
        },
        {
          year: 2023,
          month: 10,
          profitOrLoss: 3,
          assetsValue: 22345,
        },
      ],
      loanAmount: 999,
    };
  });
  it("default case", () => {
    application.balanceSheet[0].profitOrLoss = -100;
    expect(preAssessmentRule(application, result)).toEqual({
      init: "~~init~~",
      preAssessment: 20,
    });
  });
  it("not negative profit case", () => {
    expect(preAssessmentRule(application, result)).toEqual({
      init: "~~init~~",
      preAssessment: 60,
    });
  });

  it("profit more than lone", () => {
    application.balanceSheet[0].profitOrLoss = 1000;
    expect(preAssessmentRule(application, result)).toEqual({
      init: "~~init~~",
      preAssessment: 100,
    });
  });
});
