import getBalance from "./getBalance";
import validate from "../lib/validation";
import { Context } from "koa";
import { asMockFunction } from "../testing/helpers";
import requestBalanceSheet from "../lib/requestBalance/requestBalanceSheet";
import { BalanceSheetType } from "../types/Balance";

jest.mock("../lib/validation");
jest.mock("../lib/requestBalance/requestBalanceSheet");

describe("getBalance", () => {
  test("validation failed ", async () => {
    const param = { response: {}, request: {} } as Context;
    asMockFunction(validate).mockImplementationOnce(() => {
      throw "-Error-";
    });
    await getBalance(param);
    expect(param.response).toEqual({
      body: { message: "-Error-" },
      status: 400,
    });
  });

  test("requestBalanceSheet failed ", async () => {
    const param = { response: {}, request: {} } as Context;
    asMockFunction(requestBalanceSheet).mockImplementationOnce(() => {
      throw "-Error-";
    });
    await getBalance(param);
    expect(param.response).toEqual({
      body: { message: "Intermal error" },
      status: 500,
    });
  });

  test("requestBalanceSheet successed ", async () => {
    const param = { response: {}, request: {} } as Context;
    asMockFunction(requestBalanceSheet).mockReturnValueOnce(
      Promise.resolve("sheet" as unknown as BalanceSheetType)
    );
    await getBalance(param);
    expect(param.response).toEqual({
      body: "sheet",
      status: 200,
    });
  });
});
