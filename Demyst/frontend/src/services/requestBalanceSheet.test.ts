import axios from "axios";
import { requestBalanceSheet } from "./requestBalanceSheet";

jest.mock("axios");

describe("requestBalanceSheet", () => {
  const dispatch = jest.fn();
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
    const result = await requestBalanceSheet(dispatch)(
      emptyFormData as unknown as FormData
    );

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

    await requestBalanceSheet(dispatch)(formData as unknown as FormData);
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

  it("get balance sheet", async () => {
    axios.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: "balance sheet" }));

    await requestBalanceSheet(dispatch)(formData as unknown as FormData);
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
            loanAmount: 12345,
            accountProvider: "myob",
            balanceSheet: "balance sheet",
            company: {
              companyName: "Horns and Hooves",
              estYear: 2020,
            },
          },
          type: "SET_APPLICATION",
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
