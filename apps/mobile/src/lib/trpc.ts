import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@ascend/api";
import { getApiUrl } from "./api";

export const trpc = createTRPCReact<AppRouter>();

export function createTrpcClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${getApiUrl()}/trpc`,
      }),
    ],
  });
}
