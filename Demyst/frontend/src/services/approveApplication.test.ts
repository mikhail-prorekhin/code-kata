import axios from "axios";
import approveApplication from "./approveApplication";

jest.mock("axios");

describe("approveApplication", () => {
  const dispatch = jest.fn();
  const state = {
    company: { companyName: "Horns and Hooves", estYear: 2023 },
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

  it("api error", async () => {
    axios.post = jest.fn().mockReturnValue(Promise.reject("error happends"));

    await approveApplication(dispatch, state)("event");
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch.mock.calls).toEqual([
      [
        {
          type: "NETWORK_IN_PROGRESS",
        },
      ],
      [
        {
          type: "NETWORK_DONE",
        },
      ],
    ]);
  });

  it("set application", async () => {
    axios.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: "balance sheet" }));

    await approveApplication(dispatch, state)("event");
    expect(dispatch).toBeCalledTimes(3);
    expect(dispatch.mock.calls).toEqual([
      [
        {
          type: "NETWORK_IN_PROGRESS",
        },
      ],
      [
        {
          payload: {
            decision: "balance sheet",
          },
          type: "SET_DECISION",
        },
      ],
      [
        {
          type: "NETWORK_DONE",
        },
      ],
    ]);
  });
});
