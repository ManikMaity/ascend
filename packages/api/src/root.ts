import { createTRPCRouter } from "./trpc";
import { healthRouter } from "./features/health/router";

export const appRouter = createTRPCRouter({
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
