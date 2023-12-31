import { BalanceSheetRequestType } from "../../../types/BalanceSheetRequest";
import requestMYOBBalace from "./requestMYOBBalace";
import axios from "axios";

jest.mock("axios");

describe("requestMYOBBalace", () => {
  it("send", async () => {
    axios.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: "--axios.post --" }));

    const request =
      "--BalanceSheetRequestType--" as unknown as BalanceSheetRequestType;

    expect(await requestMYOBBalace(request)).toBe("--axios.post --");
    expect(axios.post).toHaveBeenCalledWith("--test--myobApiUrl--", request);
  });
});
