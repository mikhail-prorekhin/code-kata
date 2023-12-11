import { ZodError } from "zod";
import { Company } from "../types/Company";
import validate from "./validation";

describe("validate", () => {
  it("object matches type", () => {
    validate({ companyName: "Horns and Hooves", estYear: 2000 }, Company);
    expect(true).toBeTruthy();
  });

  it("object does not  matche type", () => {
    try {
      validate({ companyName: "Horns and Hooves", estYear: 3000 }, Company);
    } catch (e: any) {
      expect(e.issues).toStrictEqual([
        {
          code: "too_big",
          maximum: 2023,
          type: "number",
          inclusive: true,
          exact: false,
          message: "Number must be less than or equal to 2023",
          path: ["estYear"],
        },
      ]);
    }
  });
});
