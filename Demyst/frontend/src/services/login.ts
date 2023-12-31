import { ActionType, ActionTypes } from "../redux/appReducer";
import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginData } from "../types/LoginData";
import { flatIssues, setErrorMessage } from "./utils";

export type AuthFormState = {
  errors?: {
    login?: string[];
    password?: string[];
  };
  message?: string;
};

export const login =
  (dispatch: React.Dispatch<ActionType>) => async (formData: FormData) => {
    const request = {
      login: formData.get("login"),
      password: formData.get("password"),
    };

    const validatedFields = LoginData.safeParse(request);

    if (!validatedFields.success) {
      return {
        errors: flatIssues(validatedFields.error.issues),
        message: "Please fill in missing Fields",
      };
    }

    dispatch({ type: ActionTypes.NetworkInProgress });
    dispatch({ type: ActionTypes.cleanMessage });
    let response: AxiosResponse;
    const url =
      formData.get("tabIndex") === "1" ? "/api/register" : "/api/login";
    try {
      response = await axios.post(url, request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: ActionTypes.login,
        payload: {
          user: {
            login: response.data.user.login,
            gwt: {
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            },
          },
        },
      });
    } catch (err) {
      setErrorMessage(err as AxiosError, dispatch);
    }
    dispatch({ type: ActionTypes.NetworkDone });
    return {};
  };
