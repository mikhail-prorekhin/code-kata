import axios, { AxiosResponse } from "axios";
import { BalanceSheetType } from "../../../types/Balance";
import { BalanceSheetRequestType } from "../../../types/BalanceSheetRequest";

export default async (
  request: BalanceSheetRequestType
): Promise<BalanceSheetType> => {
  //map to MYOB request type
  let response: AxiosResponse;
  response = await axios.post(<string>process.env.MYOB_API_URL, request);

  //map from MYOB response type
  return <BalanceSheetType>response.data;
};
