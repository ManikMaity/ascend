import { createAuthClient } from "better-auth/react";

export function createAscendAuthClient(baseURL: string) {
  return createAuthClient({
    baseURL,
  });
}

export type AscendAuthClient = ReturnType<typeof createAscendAuthClient>;
