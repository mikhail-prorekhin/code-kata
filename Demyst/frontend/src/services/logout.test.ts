import axios from "axios";
import { logout } from "./logout";
import { ActionTypes } from "../redux/appReducer";

jest.mock("axios");

describe("logout", () => {
  const dispatch = jest.fn();
  const gwt = { accessToken: "-accessToken-", refreshToken: "-refreshToken-" };

  it("api error", async () => {
    axios.post = jest.fn().mockReturnValue(Promise.reject("error happends"));

    await logout(dispatch, gwt)();
    expect(dispatch.mock.calls).toEqual([
      [{ type: ActionTypes.NetworkInProgress }],
      [{ type: ActionTypes.cleanMessage }],
      [
        {
          payload: { message: "Internal server error" },
          type: ActionTypes.setMessage,
        },
      ],
      [{ type: ActionTypes.NetworkDone }],
    ]);
  });

  it("call logout api", async () => {
    axios.post = jest.fn().mockReturnValue(
      Promise.resolve({
        data: "OK",
      })
    );

    await logout(dispatch, gwt)();
    expect(axios.post).toHaveBeenCalledWith(
      "/api/logout",
      { accessToken: "-accessToken-", refreshToken: "-refreshToken-" },
      { headers: { "Content-Type": "application/json" } }
    );

    expect(dispatch.mock.calls).toEqual([
      [
        {
          type: ActionTypes.NetworkInProgress,
        },
      ],
      [
        {
          type: ActionTypes.cleanMessage,
        },
      ],
      [
        {
          type: ActionTypes.logout,
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
