import z from "zod";

export const Company = z.object({
  companyName: z.string().min(2),
  estYear: z.number().max(new Date().getFullYear()).min(0),
});

export type CompanyType = z.infer<typeof Company>;
