import { ActionType, ActionTypes } from "../redux/appReducer";
import axios, { AxiosError } from "axios";
import { setErrorMessage } from "./utils";
import { GWTDataType } from "../types/GWTData";

export const logout =
  (dispatch: React.Dispatch<ActionType>, gwt: GWTDataType) => async () => {
    dispatch({ type: ActionTypes.NetworkInProgress });
    dispatch({ type: ActionTypes.cleanMessage });

    try {
      await axios.post("/api/logout", gwt, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: ActionTypes.logout,
      });
    } catch (err) {
      setErrorMessage(err as AxiosError, dispatch);
    }
    dispatch({ type: ActionTypes.NetworkDone });
    return {};
  };
