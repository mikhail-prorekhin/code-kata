import { AccountProviderType } from "../types/AccountProvider";
import { BalanceSheetType } from "../types/Balance";
import { CompanyType } from "../types/Company";
import { DecisionType } from "../types/Decision";
import { GWTDataType } from "../types/GWTData";
import { UserType } from "../types/User";

export type AppStateType = {
  networkInProgress?: boolean;
  company?: CompanyType;
  accountProvider?: AccountProviderType;
  loanAmount?: number;
  balanceSheet?: BalanceSheetType;
  decision?: DecisionType;
  user?: UserType;
  error?: string;
  message?: string;
};

export enum ActionTypes {
  Clean = "CLEAN",
  NetworkInProgress = "NETWORK_IN_PROGRESS",
  NetworkDone = "NETWORK_DONE",
  setApplication = "SET_APPLICATION",
  setDecision = "SET_DECISION",
  logout = "LOG_OUT",
  refreshGWT = "REFRESH_GWT",
  login = "LOG_IN",
  setMessage = "SET_MESSAGE",
  cleanMessage = "CLEAN_MESSAGE",
}

export type ActionType =
  | { type: undefined }
  | { type: ActionTypes.Clean }
  | { type: ActionTypes.NetworkInProgress }
  | { type: ActionTypes.NetworkDone }
  | {
      type: ActionTypes.setApplication;
      payload: {
        balanceSheet: BalanceSheetType;
        company: CompanyType;
        accountProvider: AccountProviderType;
        loanAmount: number;
      };
    }
  | { type: ActionTypes.setDecision; payload: { decision: DecisionType } }
  | { type: ActionTypes.logout }
  | { type: ActionTypes.refreshGWT; payload: { gwt: GWTDataType } }
  | { type: ActionTypes.login; payload: { user: UserType } }
  | { type: ActionTypes.cleanMessage }
  | { type: ActionTypes.setMessage; payload: { message: string } };

export const appReducer = (
  state: AppStateType,
  action: ActionType
): AppStateType => {
  switch (action.type) {
    case ActionTypes.Clean: {
      return { user: state.user };
    }
    case ActionTypes.NetworkInProgress: {
      return { ...state, networkInProgress: true };
    }
    case ActionTypes.NetworkDone: {
      return { ...state, networkInProgress: false };
    }
    case ActionTypes.setApplication: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.setDecision: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.logout: {
      return { ...state, user: undefined };
    }
    case ActionTypes.cleanMessage: {
      return { ...state, message: undefined };
    }
    case ActionTypes.setMessage: {
      return { ...state, ...action.payload };
    }
    case ActionTypes.refreshGWT: {
      return {
        ...state,
        user: { login: state.user?.login as string, gwt: action.payload.gwt },
      };
    }
    case ActionTypes.login: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const isLoadingState = (state: AppStateType) => state.networkInProgress;
export const isInitialStep = (state: AppStateType) =>
  !state.company || !state.accountProvider || !state.loanAmount;
export const isReviewStep = (state: AppStateType) =>
  !isInitialStep(state) && state.balanceSheet && !state.decision;
export const isFinalStep = (state: AppStateType) =>
  !isInitialStep(state) && state.balanceSheet && state.decision;
export const isUserAuthentificated = (state: AppStateType) =>
  state.user?.login &&
  state.user?.gwt.accessToken &&
  state.user?.gwt.refreshToken;

export const initialState = (): AppStateType => ({});
