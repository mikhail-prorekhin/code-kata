import { ZodIssue } from "zod";
import { AccountProviderType } from "../types/AccountProvider";
import { BalanceSheetRequest } from "../types/BalanceSheetRequest";
import { ActionType, ActionTypes } from "../redux/appReducer";
import axios, { AxiosResponse } from "axios";
import { CompanyType } from "../types/Company";

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

export const flatIssues = (issues: ZodIssue[]) =>
  Object.fromEntries(
    issues.map((itm: ZodIssue) => [itm.path[itm.path.length - 1], itm.message])
  );

export const requestBalanceSheet =
  (dispatch: React.Dispatch<ActionType>) => async (formData: FormData) => {
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
    let response: AxiosResponse;
    try {
      response = await axios.post("/api/balance", request, {
        headers: {
          "Content-Type": "application/json",
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
    } catch (_) {
      //TODO: notyfy about error
    }
    dispatch({ type: ActionTypes.NetworkDone });
    return {};
  };
