import axios, { AxiosResponse } from "axios";
import config from "config";
import { BalanceSheetType } from "../../../types/Balance";
import { BalanceSheetRequestType } from "../../../types/BalanceSheetRequest";

export default async (
  request: BalanceSheetRequestType
): Promise<BalanceSheetType> => {
  //map to MYOB request type
  let response: AxiosResponse;
  response = await axios.post(
    <string>config.get("remoteServices.myobApiUrl"),
    request
  );

  //map from MYOB response type
  return <BalanceSheetType>response.data;
};
