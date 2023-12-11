import { ZodObject } from "zod";

export default (value: unknown, type: ZodObject<any>) => {
  type.parse(value);
};
