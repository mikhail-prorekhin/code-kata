import { AccountProviderType } from "../types/AccountProvider";
import { BalanceSheetRequest } from "../types/BalanceSheetRequest";
import { ActionType, ActionTypes } from "../redux/appReducer";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CompanyType } from "../types/Company";
import { refresh, setErrorMessage, flatIssues } from "./utils";
import { UserType } from "../types/User";

export type ApplicationFormState = {
  errors?: {
    companyName?: string[];
    estYear?: string[];
    status?: string[];
    loanAmount?: string[];
    accountProvider?: string[];
  };
  message?: string;
};

export const requestBalanceSheet =
  (dispatch: React.Dispatch<ActionType>, user: UserType) =>
  async (formData: FormData) => {
    const request = {
      businessDetails: {
        companyName: formData.get("companyName"),
        estYear: parseInt(formData.get("estYear") as string),
      },
      loanAmount: parseInt(formData.get("loanAmount") as string),
      accountProvider: formData.get("accountProvider"),
    };
    const validatedFields = BalanceSheetRequest.safeParse(request);

    if (!validatedFields.success) {
      return {
        errors: flatIssues(validatedFields.error.issues),
        message: "Please fill in missing Fields. Failed to Create Application.",
      };
    }

    dispatch({ type: ActionTypes.NetworkInProgress });

    const accessToken = await refresh(user.gwt, dispatch);
    let response: AxiosResponse;
    try {
      response = await axios.post("/api/balance", request, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      dispatch({
        type: ActionTypes.setApplication,
        payload: {
          balanceSheet: response.data,
          company: request.businessDetails as CompanyType,
          accountProvider: request.accountProvider as AccountProviderType,
          loanAmount: request.loanAmount,
        },
      });
    } catch (err) {
      setErrorMessage(err as AxiosError, dispatch);
    }
    dispatch({ type: ActionTypes.NetworkDone });
    return {};
  };
