import axios from "axios";
import approveApplication from "./approveApplication";
import { refresh } from "./utils";
import { asMockFunction } from "../testing/helpers";
import { ActionTypes } from "../redux/appReducer";

jest.mock("axios");
jest.mock("./utils");

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
    user: {
      login: "user name",
      gwt: {
        accessToken: "---accessToken---",
        refreshToken: "--refreshToken--",
      },
    },
  };

  it("api error", async () => {
    axios.post = jest.fn().mockReturnValue(Promise.reject("error happends"));
    asMockFunction(refresh).mockReturnValue(Promise.resolve("-accessToken-"));

    await approveApplication(dispatch, state)("event");
    expect(dispatch.mock.calls).toEqual([
      [
        {
          type: ActionTypes.NetworkInProgress,
        },
      ],
      [
        {
          type: ActionTypes.NetworkDone,
        },
      ],
    ]);
  });

  it("set application", async () => {
    axios.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: { decision: "approved" } }));
    asMockFunction(refresh).mockReturnValue(Promise.resolve("-accessToken-"));

    await approveApplication(dispatch, state)("event");
    expect(axios.post).toHaveBeenCalledWith(
      "/api/application",
      {
        balanceSheet: [
          { assetsValue: 1234, month: 12, profitOrLoss: 100, year: 2023 },
          { assetsValue: 5789, month: 11, profitOrLoss: 110, year: 2023 },
          { assetsValue: 22345, month: 10, profitOrLoss: 210, year: 2023 },
        ],
        businessDetails: { companyName: "Horns and Hooves", estYear: 2023 },
        loanAmount: 999,
      },
      {
        headers: {
          Authorization: "Bearer -accessToken-",
          "Content-Type": "application/json",
        },
      }
    );
    expect(dispatch.mock.calls).toEqual([
      [
        {
          type: ActionTypes.NetworkInProgress,
        },
      ],
      [
        {
          payload: {
            decision: "approved",
          },
          type: ActionTypes.setDecision,
        },
      ],
      [
        {
          type: ActionTypes.NetworkDone,
        },
      ],
    ]);
  });
});
