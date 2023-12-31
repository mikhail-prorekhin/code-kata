import { BalanceSheetRequestType } from "../../../types/BalanceSheetRequest";
import requestXeroBalace from "./requestXeroBalace";
import axios from "axios";

jest.mock("axios");

describe("requestXeroBalace", () => {
  it("send", async () => {
    axios.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: "--axios.post --" }));

    const request =
      "--BalanceSheetRequestType--" as unknown as BalanceSheetRequestType;

    expect(await requestXeroBalace(request)).toBe("--axios.post --");
    expect(axios.post).toHaveBeenCalledWith("--test--xeroApiUrl--", request);
  });
});
