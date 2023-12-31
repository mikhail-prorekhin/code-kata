import axios from "axios";
import { requestBalanceSheet } from "./requestBalanceSheet";
import * as utils from "./utils";
import { ActionTypes } from "../redux/appReducer";

jest.mock("axios");

describe("requestBalanceSheet", () => {
  const dispatch = jest.fn();
  const user = {
    login: "user name",
    gwt: {
      accessToken: "---accessToken---",
      refreshToken: "--refreshToken--",
    },
  };
  const emptyFormData = {
    get: () => undefined,
  };

  const formData = {
    get: (propertyName: string): string => {
      switch (propertyName) {
        case "companyName":
          return "Horns and Hooves";
        case "estYear":
          return "2020";
        case "loanAmount":
          return "12345";
        case "accountProvider":
          return "myob";
        default:
          return "";
      }
    },
  };

  it("validation failed", async () => {
    const result = await requestBalanceSheet(
      dispatch,
      user
    )(emptyFormData as unknown as FormData);

    expect(dispatch).not.toHaveBeenCalled();
    expect(result).toEqual({
      errors: {
        accountProvider: "Required",
        companyName: "Required",
        estYear: "Expected number, received nan",
        loanAmount: "Expected number, received nan",
      },
      message: "Please fill in missing Fields. Failed to Create Application.",
    });
  });

  it("api error", async () => {
    axios.post = jest.fn().mockReturnValue(Promise.reject("error happends"));
    jest
      .spyOn(utils, "refresh")
      .mockReturnValue(Promise.resolve("-accessToken-"));

    await requestBalanceSheet(dispatch, user)(formData as unknown as FormData);
    expect(dispatch.mock.calls).toEqual([
      [{ type: ActionTypes.NetworkInProgress }],
      [
        {
          payload: { message: "Internal server error" },
          type: ActionTypes.setMessage,
        },
      ],
      [{ type: ActionTypes.NetworkDone }],
    ]);
  });

  it("get balance sheet", async () => {
    axios.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: "balance sheet" }));
    jest
      .spyOn(utils, "refresh")
      .mockReturnValue(Promise.resolve("-accessToken-"));

    await requestBalanceSheet(dispatch, user)(formData as unknown as FormData);
    expect(axios.post).toHaveBeenCalledWith(
      "/api/balance",
      {
        accountProvider: "myob",
        businessDetails: { companyName: "Horns and Hooves", estYear: 2020 },
        loanAmount: 12345,
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
            loanAmount: 12345,
            accountProvider: "myob",
            balanceSheet: "balance sheet",
            company: {
              companyName: "Horns and Hooves",
              estYear: 2020,
            },
          },
          type: ActionTypes.setApplication,
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
