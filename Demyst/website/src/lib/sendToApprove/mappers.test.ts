import { mapToDecisionEngineRequest } from "./mappers";

describe("mapToDecisionEngineRequest", () => {
  it("map", () => {
    const application = {
      businessDetails: { companyName: "Horns and Hooves", estYear: 2023 },
      balanceSheet: [
        {
          year: 2023,
          month: 12,
          profitOrLoss: 100,
          assetsValue: 1234,
        },
        {
          year: 2023,
          month: 11,
          profitOrLoss: 110,
          assetsValue: 5789,
        },
        {
          year: 2023,
          month: 10,
          profitOrLoss: 210,
          assetsValue: 22345,
        },
      ],
      loanAmount: 999,
    };
    const rulesResult = { preAssessment: 777 };
    expect(mapToDecisionEngineRequest(application, rulesResult)).toEqual({
      businessDetails: application.businessDetails,
      profit: 420,
      preAssessment: rulesResult.preAssessment,
    });
  });
});
