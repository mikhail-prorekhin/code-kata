import {
  appReducer,
  isLoadingState,
  isInitialStep,
  isReviewStep,
  isFinalStep,
  ActionType,
  ActionTypes,
} from "./appReducer";
describe("appReducer", () => {
  describe("redux", () => {
    it("unknown action", () => {
      try {
        appReducer({}, { type: "unknown" } as unknown as ActionType);
        expect(true).toBeFalsy();
      } catch (e) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(e).toEqual(Error("Unknown action: unknown"));
      }
    });

    it("clean", () => {
      expect(
        appReducer(
          {
            networkInProgress: false,
            company: {
              companyName: "Horns and Hooves",
              estYear: 1999,
            },
          },
          { type: ActionTypes.Clean }
        )
      ).toEqual({});
    });

    it("networt loading", () => {
      expect(
        appReducer(
          {
            networkInProgress: false,
            company: {
              companyName: "Horns and Hooves",
              estYear: 1999,
            },
          },
          { type: ActionTypes.NetworkInProgress }
        )
      ).toEqual({
        networkInProgress: true,
        company: {
          companyName: "Horns and Hooves",
          estYear: 1999,
        },
      });
    });

    it("networt loaded", () => {
      expect(
        appReducer(
          {
            networkInProgress: true,
            company: {
              companyName: "Horns and Hooves",
              estYear: 1999,
            },
          },
          { type: ActionTypes.NetworkDone }
        )
      ).toEqual({
        networkInProgress: false,
        company: {
          companyName: "Horns and Hooves",
          estYear: 1999,
        },
      });
    });

    it("set application", () => {
      expect(
        appReducer(
          {
            networkInProgress: true,
          },
          {
            type: ActionTypes.setApplication,
            payload: {
              company: {
                companyName: "Horns and Hooves",
                estYear: 1999,
              },
              accountProvider: "myob",
              loanAmount: 300,
              balanceSheet: [
                {
                  year: 2023,
                  month: 12,
                  profitOrLoss: 250000,
                  assetsValue: 1234,
                },
                {
                  year: 2023,
                  month: 11,
                  profitOrLoss: 1150,
                  assetsValue: 5789,
                },
              ],
            },
          }
        )
      ).toEqual({
        networkInProgress: true,
        company: {
          companyName: "Horns and Hooves",
          estYear: 1999,
        },
        accountProvider: "myob",
        loanAmount: 300,
        balanceSheet: [
          {
            year: 2023,
            month: 12,
            profitOrLoss: 250000,
            assetsValue: 1234,
          },
          {
            year: 2023,
            month: 11,
            profitOrLoss: 1150,
            assetsValue: 5789,
          },
        ],
      });
    });

    it("set desigion", () => {
      expect(
        appReducer(
          {
            networkInProgress: true,
            company: {
              companyName: "Horns and Hooves",
              estYear: 1999,
            },
            accountProvider: "myob",
            loanAmount: 300,
            balanceSheet: [
              {
                year: 2023,
                month: 12,
                profitOrLoss: 250000,
                assetsValue: 1234,
              },
              {
                year: 2023,
                month: 11,
                profitOrLoss: 1150,
                assetsValue: 5789,
              },
            ],
          },
          {
            type: ActionTypes.setDecision,
            payload: { decision: { decision: "approved" } },
          }
        )
      ).toEqual({
        networkInProgress: true,
        company: {
          companyName: "Horns and Hooves",
          estYear: 1999,
        },
        accountProvider: "myob",
        loanAmount: 300,
        decision: { decision: "approved" },
        balanceSheet: [
          {
            year: 2023,
            month: 12,
            profitOrLoss: 250000,
            assetsValue: 1234,
          },
          {
            year: 2023,
            month: 11,
            profitOrLoss: 1150,
            assetsValue: 5789,
          },
        ],
      });
    });
  });
  describe("steps", () => {
    it("loading", () => {
      expect(
        isLoadingState({
          networkInProgress: true,
          company: {
            companyName: "Horns and Hooves",
            estYear: 1999,
          },
          accountProvider: "myob",
          loanAmount: 300,
          decision: { decision: "approved" },
          balanceSheet: [
            {
              year: 2023,
              month: 12,
              profitOrLoss: 250000,
              assetsValue: 1234,
            },
            {
              year: 2023,
              month: 11,
              profitOrLoss: 1150,
              assetsValue: 5789,
            },
          ],
        })
      ).toBeTruthy();
    });
    it("final", () => {
      expect(
        isFinalStep({
          networkInProgress: false,
          company: {
            companyName: "Horns and Hooves",
            estYear: 1999,
          },
          accountProvider: "myob",
          loanAmount: 300,
          decision: { decision: "approved" },
          balanceSheet: [
            {
              year: 2023,
              month: 12,
              profitOrLoss: 250000,
              assetsValue: 1234,
            },
            {
              year: 2023,
              month: 11,
              profitOrLoss: 1150,
              assetsValue: 5789,
            },
          ],
        })
      ).toBeTruthy();
    });
    it("review", () => {
      expect(
        isReviewStep({
          networkInProgress: false,
          company: {
            companyName: "Horns and Hooves",
            estYear: 1999,
          },
          accountProvider: "myob",
          loanAmount: 300,
          balanceSheet: [
            {
              year: 2023,
              month: 12,
              profitOrLoss: 250000,
              assetsValue: 1234,
            },
            {
              year: 2023,
              month: 11,
              profitOrLoss: 1150,
              assetsValue: 5789,
            },
          ],
        })
      ).toBeTruthy();
    });
    it("initial (no provider info)", () => {
      expect(
        isInitialStep({
          networkInProgress: false,
          company: {
            companyName: "Horns and Hooves",
            estYear: 1999,
          },
          loanAmount: 300,
          balanceSheet: [
            {
              year: 2023,
              month: 12,
              profitOrLoss: 250000,
              assetsValue: 1234,
            },
            {
              year: 2023,
              month: 11,
              profitOrLoss: 1150,
              assetsValue: 5789,
            },
          ],
        })
      ).toBeTruthy();
    });
  });
});
