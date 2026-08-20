import { authRouter } from "./features/auth/router";
import { healthRouter } from "./features/health/router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
