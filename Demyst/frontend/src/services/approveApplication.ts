import { ActionType, ActionTypes, AppStateType } from "../redux/appReducer";
import axios, { AxiosResponse } from "axios";
import { CompanyType } from "../types/Company";
import { ApplicationRequestType } from "../types/ApplicationRequest";
import { BalanceSheetType } from "../types/Balance";

const approveApplication =
  (dispatch: React.Dispatch<ActionType>, state: AppStateType) =>
  async (_: any) => {
    const request: ApplicationRequestType = {
      businessDetails: state.company as CompanyType,
      balanceSheet: state.balanceSheet as BalanceSheetType,
      loanAmount: state.loanAmount as number,
    };

    dispatch({ type: ActionTypes.NetworkInProgress });
    let response: AxiosResponse;
    try {
      response = await axios.post("/api/application", request, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: ActionTypes.setDecision,
        payload: {
          decision: response.data,
        },
      });
    } catch (_) {
      // TODO: notify about error, now do nothing
    }
    dispatch({ type: ActionTypes.NetworkDone });
  };

export default approveApplication;
