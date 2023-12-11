import { AccountProviderType } from "../types/AccountProvider";
import { BalanceSheetType } from "../types/Balance";
import { CompanyType } from "../types/Company";
import { DecisionType } from "../types/Decision";

export type AppStateType = {
  networkInProgress?: boolean;
  company?: CompanyType;
  accountProvider?: AccountProviderType;
  loanAmount?: number;
  balanceSheet?: BalanceSheetType;
  decision?: DecisionType;
};

export enum ActionTypes {
  Clean = "CLEAN",
  NetworkInProgress = "NETWORK_IN_PROGRESS",
  NetworkDone = "NETWORK_DONE",
  setApplication = "SET_APPLICATION",
  setDecision = "SET_DECISION",
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
  | { type: ActionTypes.setDecision; payload: { decision: DecisionType } };

export const appReducer = (
  state: AppStateType,
  action: ActionType
): AppStateType => {
  switch (action.type) {
    case ActionTypes.Clean: {
      return {};
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

export const initialState = (): AppStateType => ({});
