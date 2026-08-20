import { createAuthClient } from "better-auth/react";

export { expoClient } from "@better-auth/expo/client";

type CreateAuthClientOptions = NonNullable<Parameters<typeof createAuthClient>[0]>;

export function createAscendAuthClient(options: CreateAuthClientOptions) {
  return createAuthClient(options);
}

export type AscendAuthClient = ReturnType<typeof createAscendAuthClient>;
