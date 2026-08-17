import { healthResponseSchema } from "@ascend/validators";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const healthRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return healthResponseSchema.parse({
      status: "ok",
      message: "Ascend API is healthy",
      timestamp: new Date().toISOString(),
    });
  }),
});
