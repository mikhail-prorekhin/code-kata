import { BalanceSheetRequestType } from "../../types/BalanceSheetRequest";
import { BalanceSheetType } from "../../types/Balance";
import requestMYOBBalace from "./providers/requestMYOBBalace";
import requestXeroBalace from "./providers/requestXeroBalace";

export default async (
  request: BalanceSheetRequestType
): Promise<BalanceSheetType> => {
  switch (request.accountProvider) {
    case "myob":
      return await requestMYOBBalace(request);
    case "xero":
      return await requestXeroBalace(request);
    default:
      throw { message: "Unknown provider" };
  }
};
