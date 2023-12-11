import requestBalanceSheet from "./requestBalanceSheet";
import requestMYOBBalace from "./providers/requestMYOBBalace";
import requestXeroBalace from "./providers/requestXeroBalace";
import { BalanceSheetRequestType } from "../../types/BalanceSheetRequest";

jest.mock("./providers/requestMYOBBalace");
jest.mock("./providers/requestXeroBalace");

describe("requestBalanceSheet", () => {
  it("unknown provider ", async () => {
    try {
      await requestBalanceSheet({
        accountProvider: "Unknown",
      } as unknown as BalanceSheetRequestType);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e).toEqual({ message: "Unknown provider" });
    }
  });

  it(" call Xero ", async () => {
    const raram = {
      accountProvider: "xero",
    } as unknown as BalanceSheetRequestType;
    await requestBalanceSheet(raram);
    expect(requestXeroBalace).toHaveBeenCalledWith(raram);
    expect(requestMYOBBalace).not.toHaveBeenCalledWith(raram);
  });

  it(" call MYOB ", async () => {
    const raram = {
      accountProvider: "myob",
    } as unknown as BalanceSheetRequestType;
    await requestBalanceSheet(raram);
    expect(requestXeroBalace).not.toHaveBeenCalledWith(raram);
    expect(requestMYOBBalace).toHaveBeenCalledWith(raram);
  });
});
