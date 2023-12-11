import { Context } from "koa";
import {
  BalanceSheetRequest,
  BalanceSheetRequestType,
} from "../types/BalanceSheetRequest";
import validate from "../lib/validation";
import requestBalanceSheet from "../lib/requestBalance/requestBalanceSheet";

export default async (ctx: Context) => {
  const request = <BalanceSheetRequestType>ctx.request.body;
  try {
    validate(request, BalanceSheetRequest);
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { message: e };
    return;
  }

  try {
    const sheet = await requestBalanceSheet(request);
    ctx.response.status = 200;
    ctx.response.body = sheet;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = {
      message: "Intermal error",
    };
  }
};
