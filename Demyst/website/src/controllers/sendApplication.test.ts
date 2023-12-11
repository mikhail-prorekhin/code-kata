import sendApplication from "./sendApplication";
import validate from "../lib/validation";
import { Context } from "koa";
import { asMockFunction } from "../testing/helpers";
import sendToApprove from "../lib/sendToApprove/sendToApprove";
import applayBusinesRules from "../lib/rules/applayBusinesRules";
import { DecisionType } from "../types/Decision";
import { BusinessRulesResult } from "../lib/rules/RuleTypes";
import { ApplicationRequestType } from "../types/ApplicationRequest";

jest.mock("../lib/validation");
jest.mock("../lib/sendToApprove/sendToApprove");
jest.mock("../lib/rules/applayBusinesRules");

describe("sendApplication", () => {
  asMockFunction(applayBusinesRules).mockImplementation(
    (rec: ApplicationRequestType) => rec as unknown as BusinessRulesResult
  );

  test("validation failed ", async () => {
    const param = { response: {}, request: {} } as Context;
    asMockFunction(validate).mockImplementationOnce(() => {
      throw "-Error-";
    });
    await sendApplication(param);
    expect(param.response).toEqual({
      body: { message: "-Error-" },
      status: 400,
    });
  });

  test("sendToApprove failed ", async () => {
    const param = { response: {}, request: {} } as Context;
    asMockFunction(sendToApprove).mockImplementationOnce(() => {
      throw "-Error-";
    });
    await sendApplication(param);
    expect(param.response).toEqual({
      body: { message: "Intermal error" },
      status: 500,
    });
  });

  test("requestBalanceSheet successed ", async () => {
    const param = { response: {}, request: {} } as Context;
    asMockFunction(sendToApprove).mockReturnValueOnce(
      Promise.resolve("a decision" as unknown as DecisionType)
    );
    await sendApplication(param);
    expect(param.response).toEqual({
      body: "a decision",
      status: 200,
    });
  });
});
