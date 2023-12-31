import axios, { AxiosError } from "axios";
import { ActionTypes } from "../redux/appReducer";
import { flatIssues, setErrorMessage, refresh } from "./utils";

jest.mock("axios");

describe("utilites", () => {
  describe("flatIssues", () => {
    it("flat form errors", () => {
      expect(
        flatIssues([
          {
            code: "too_small",
            minimum: 2,
            type: "string",
            inclusive: true,
            exact: false,
            message: "String must contain at least 2 character(s)",
            path: ["businessDetails", "companyName"],
          },
          {
            code: "invalid_type",
            expected: "number",
            received: "nan",
            path: ["businessDetails", "estYear"],
            message: "Expected number, received nan",
          },
          {
            received: "",
            code: "invalid_enum_value",
            options: ["myob", "xero"],
            path: ["accountProvider"],
            message:
              "Invalid enum value. Expected 'myob' | 'xero', received ''",
          },
        ])
      ).toEqual({
        accountProvider:
          "Invalid enum value. Expected 'myob' | 'xero', received ''",
        companyName: "String must contain at least 2 character(s)",
        estYear: "Expected number, received nan",
      });
    });
  });

  describe("setErrorMessage", () => {
    const dispatch = jest.fn();

    it("others statuses", () => {
      setErrorMessage(
        { error: { status: "XXXX" } } as unknown as AxiosError,
        dispatch
      );
      expect(dispatch).toHaveBeenCalledWith({
        payload: { message: "Internal server error" },
        type: ActionTypes.setMessage,
      });
    });

    it("Access denied", () => {
      setErrorMessage({ status: 403 } as unknown as AxiosError, dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        payload: { message: "Access denied" },
        type: ActionTypes.setMessage,
      });
    });

    it("Unauthorized access", () => {
      setErrorMessage({ status: 401 } as unknown as AxiosError, dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        payload: { message: "Unauthorized access" },
        type: ActionTypes.setMessage,
      });
    });

    it("use response status", () => {
      setErrorMessage(
        { response: { status: 401 } } as unknown as AxiosError,
        dispatch
      );
      expect(dispatch).toHaveBeenCalledWith({
        payload: { message: "Unauthorized access" },
        type: ActionTypes.setMessage,
      });
    });
  });

  describe("refresh GWT", () => {
    const dispatch = jest.fn();
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NThkM2U3ODkwMGI2MTMxZDNmNjdhZDgiLCJpYXQiOjE3MDM3NzEzOTEsImV4cCI6MTcwMzc3MTY5MX0.JP8rmYPEJA9udg2BLpfv6TIiMpMQ7XWI-j0ekjWxzlU";

    it("date is not expired", async () => {
      global.Date.now = jest.fn(() => 1703771591000);
      expect(
        await refresh(
          {
            accessToken,
            refreshToken: "67c22882-74fa-4196-9304-e4ceb3622271",
          },
          dispatch
        )
      ).toEqual(accessToken);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it("date is  expired", async () => {
      global.Date.now = jest.fn(() => 1703771636000);
      axios.post = jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            accessToken: "--new accessToken--",
            refreshToken: "--new refreshToken--",
          },
        })
      );

      expect(
        await refresh(
          {
            accessToken,
            refreshToken: "67c22882-74fa-4196-9304-e4ceb3622271",
          },
          dispatch
        )
      ).toEqual("--new accessToken--");
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          gwt: {
            accessToken: "--new accessToken--",
            refreshToken: "--new refreshToken--",
          },
        },
        type: ActionTypes.refreshGWT,
      });
      expect(axios.post).toHaveBeenCalledWith(
        "/api/refresh",
        {
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NThkM2U3ODkwMGI2MTMxZDNmNjdhZDgiLCJpYXQiOjE3MDM3NzEzOTEsImV4cCI6MTcwMzc3MTY5MX0.JP8rmYPEJA9udg2BLpfv6TIiMpMQ7XWI-j0ekjWxzlU",
          refreshToken: "67c22882-74fa-4196-9304-e4ceb3622271",
        },
        { headers: { "Content-Type": "application/json" } }
      );
    });
  });
});
