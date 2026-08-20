import { authUserSchema } from "@ascend/validators";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const authRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    return authUserSchema.parse({
      id: ctx.user.id,
      name: ctx.user.name,
      email: ctx.user.email,
      image: ctx.user.image ?? null,
    });
  }),
});
