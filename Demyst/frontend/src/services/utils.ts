import axios, { AxiosError } from "axios";
import { ZodIssue } from "zod";
import { ActionType, ActionTypes } from "../redux/appReducer";
import { GWTDataType } from "../types/GWTData";

export const flatIssues = (issues: ZodIssue[]) =>
  Object.fromEntries(
    issues.map((itm: ZodIssue) => [itm.path[itm.path.length - 1], itm.message])
  );

export const setErrorMessage = (
  error: AxiosError,
  dispatch: React.Dispatch<ActionType>
) => {
  switch (error.status || error.response?.status) {
    case 403:
      dispatch({
        type: ActionTypes.setMessage,
        payload: { message: "Access denied" },
      });
      break;
    case 401:
      dispatch({
        type: ActionTypes.setMessage,
        payload: { message: "Unauthorized access" },
      });
      break;
    default:
      dispatch({
        type: ActionTypes.setMessage,
        payload: { message: "Internal server error" },
      });
  }
};

export const refresh = async (
  gwt: GWTDataType,
  dispatch: React.Dispatch<ActionType>
) => {
  const { accessToken } = gwt;
  const gwtParts = accessToken.split(".");
  const { exp } = JSON.parse(atob(gwtParts[1]));
  if (exp * 1000 < Date.now() + 60000) {
    const response = await axios.post("/api/refresh", gwt, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: ActionTypes.refreshGWT, payload: { gwt: response.data } });
    return Promise.resolve(response.data.accessToken);
  }
  return Promise.resolve(accessToken);
};
