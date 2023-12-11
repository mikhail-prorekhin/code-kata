import axios, { AxiosResponse } from "axios";
import { BalanceSheetType } from "../../../types/Balance";
import { BalanceSheetRequestType } from "../../../types/BalanceSheetRequest";

export default async (
  request: BalanceSheetRequestType
): Promise<BalanceSheetType> => {
  //map to Xero request type
  let response: AxiosResponse;

  response = await axios.post(<string>process.env.XERO_API_URL, request);

  //map from Xero response type
  return <BalanceSheetType>response.data;
};
