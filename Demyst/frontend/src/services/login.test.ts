import axios from "axios";
import { login } from "./login";
import { ActionTypes } from "../redux/appReducer";

jest.mock("axios");

describe("login / register", () => {
  const dispatch = jest.fn();
  const emptyFormData = {
    get: () => undefined,
  };

  const loginFormData = {
    get: (propertyName: string): string => {
      switch (propertyName) {
        case "login":
          return "login";
        case "password":
          return "password";
        case "tabIndex":
          return "0";
        default:
          return "";
      }
    },
  };
  const registerFormData = {
    get: (propertyName: string): string => {
      switch (propertyName) {
        case "login":
          return "login";
        case "password":
          return "password";
        case "tabIndex":
          return "1";
        default:
          return "";
      }
    },
  };

  it("validation failed", async () => {
    const result = await login(dispatch)(emptyFormData as unknown as FormData);

    expect(dispatch).not.toHaveBeenCalled();
    expect(result).toEqual({
      errors: { login: "Required", password: "Required" },
      message: "Please fill in missing Fields",
    });
  });

  it("api error", async () => {
    axios.post = jest.fn().mockReturnValue(Promise.reject("error happends"));

    await login(dispatch)(loginFormData as unknown as FormData);
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

  it("call login api", async () => {
    axios.post = jest.fn().mockReturnValue(
      Promise.resolve({
        data: {
          user: {
            _id: "-_id-",
            login: "login2",
            oauth: [],
            __v: 0,
          },
          accessToken: "-accessToken-",
          refreshToken: "-refreshToken-",
        },
      })
    );

    await login(dispatch)(loginFormData as unknown as FormData);
    expect(axios.post).toHaveBeenCalledWith(
      "/api/login",
      { login: "login", password: "password" },
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
          payload: {
            user: {
              gwt: {
                accessToken: "-accessToken-",
                refreshToken: "-refreshToken-",
              },
              login: "login2",
            },
          },
          type: ActionTypes.login,
        },
      ],
      [
        {
          type: ActionTypes.NetworkDone,
        },
      ],
    ]);
  });

  it("call register api", async () => {
    axios.post = jest.fn().mockReturnValue(
      Promise.resolve({
        data: {
          user: {
            _id: "-_id-",
            login: "login2",
            oauth: [],
            __v: 0,
          },
          accessToken: "-accessToken-",
          refreshToken: "-refreshToken-",
        },
      })
    );

    await login(dispatch)(registerFormData as unknown as FormData);
    expect(axios.post).toHaveBeenCalledWith(
      "/api/register",
      { login: "login", password: "password" },
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
          payload: {
            user: {
              gwt: {
                accessToken: "-accessToken-",
                refreshToken: "-refreshToken-",
              },
              login: "login2",
            },
          },
          type: ActionTypes.login,
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
