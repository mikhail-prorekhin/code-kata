import React from "react";
import useSocialAuth from "./useSocialAuth";
import { ActionType, ActionTypes } from "../redux/appReducer";
import { useCookies } from "react-cookie";
import { asMockFunction } from "../testing/helpers";

jest.mock("react-cookie");

describe("useSocialAuth", () => {
  it("remove cookies", async () => {
    jest.spyOn(React, "useEffect").mockImplementation((fn) => fn());
    const dispatch = jest.fn() as React.Dispatch<ActionType>;
    const removeCookie = jest.fn();
    const cookies = {
      user_auth: {
        user: { login: "user name" },
        gwt: {
          accessToken: "---accessToken---",
          refreshToken: "--refreshToken--",
        },
      },
    };
    asMockFunction(useCookies).mockReturnValue([
      cookies,
      undefined as unknown as (name: string, value: any) => void,
      removeCookie as (name: string) => void,
      undefined as unknown as () => void,
    ]);

    await useSocialAuth(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        user: {
          gwt: { accessToken: undefined, refreshToken: undefined },
          login: "user name",
        },
      },
      type: ActionTypes.login,
    });
    expect(removeCookie).toHaveBeenCalledWith("user_auth");
  });

  it("do nothing if user_auth absents", async () => {
    jest.spyOn(React, "useEffect").mockImplementation((fn) => fn());
    const dispatch = jest.fn() as React.Dispatch<ActionType>;
    const removeCookie = jest.fn();
    const cookies = {};
    asMockFunction(useCookies).mockReturnValue([
      cookies,
      undefined as unknown as (name: string, value: any) => void,
      removeCookie as (name: string) => void,
      undefined as unknown as () => void,
    ]);

    await useSocialAuth(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    expect(removeCookie).not.toHaveBeenCalled();
  });
});
