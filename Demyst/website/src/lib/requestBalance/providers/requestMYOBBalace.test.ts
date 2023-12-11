import { BalanceSheetRequestType } from "../../../types/BalanceSheetRequest";
import requestMYOBBalace from "./requestMYOBBalace";
import axios from "axios";

jest.mock("axios");

describe("requestMYOBBalace", () => {
  it("send", async () => {
    process.env.MYOB_API_URL = "--MYOB_API_URL--";
    axios.post = jest
      .fn()
      .mockReturnValue(Promise.resolve({ data: "--axios.post --" }));

    const request =
      "--BalanceSheetRequestType--" as unknown as BalanceSheetRequestType;

    expect(await requestMYOBBalace(request)).toBe("--axios.post --");
    expect(axios.post).toHaveBeenCalledWith(process.env.MYOB_API_URL, request);
  });
});
