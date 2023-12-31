import z from "zod";

export const Decision = z.enum(["approved", "rejected"]);

export type DecisionType = z.infer<typeof Decision>;
