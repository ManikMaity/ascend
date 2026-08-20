import { z } from "zod";

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().nullable(),
});

export type AuthUser = z.infer<typeof authUserSchema>;
