import z from "zod";

export const LoginData = z.object({
  login: z.string().min(1, { message: "Login is requared" }),
  password: z.string().min(1, { message: "Password is requared" }),
});

export type LoginDataType = z.infer<typeof LoginData>;
