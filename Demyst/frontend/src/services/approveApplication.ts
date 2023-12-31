import { ActionType, ActionTypes, AppStateType } from "../redux/appReducer";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CompanyType } from "../types/Company";
import { ApplicationRequestType } from "../types/ApplicationRequest";
import { BalanceSheetType } from "../types/Balance";
import { refresh, setErrorMessage } from "./utils";
import { GWTDataType } from "../types/GWTData";

const approveApplication =
  (dispatch: React.Dispatch<ActionType>, state: AppStateType) =>
  async (_: any) => {
    const request: ApplicationRequestType = {
      businessDetails: state.company as CompanyType,
      balanceSheet: state.balanceSheet as BalanceSheetType,
      loanAmount: state.loanAmount as number,
    };

    dispatch({ type: ActionTypes.NetworkInProgress });
    const accessToken = await refresh(state.user?.gwt as GWTDataType, dispatch);
    let response: AxiosResponse;
    try {
      response = await axios.post("/api/application", request, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      dispatch({
        type: ActionTypes.setDecision,
        payload: {
          ...response.data,
        },
      });
    } catch (err) {
      setErrorMessage(err as AxiosError, dispatch);
    }
    dispatch({ type: ActionTypes.NetworkDone });
  };

export default approveApplication;
