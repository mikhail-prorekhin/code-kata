import { Context } from "koa";
import validate from "../lib/validation";
import {
  ApplicationRequest,
  ApplicationRequestType,
} from "../types/ApplicationRequest";
import applayBusinesRules from "../lib/rules/applayBusinesRules";
import { BusinessRulesResult } from "../lib/rules/RuleTypes";
import sendToApprove from "../lib/sendToApprove/sendToApprove";

export default async (ctx: Context) => {
  const request = <ApplicationRequestType>ctx.request.body;
  try {
    validate(request, ApplicationRequest);
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { message: e };
    return;
  }

  const rulesResult: BusinessRulesResult = applayBusinesRules(request);

  try {
    const decision = await sendToApprove(request, rulesResult);
    ctx.response.status = 200;
    ctx.response.body = decision;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = {
      message: "Intermal error",
    };
  }
};
