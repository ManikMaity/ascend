import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@ascend/api/router";
import { authClient } from "./auth-client";
import { getApiUrl } from "./api";

export const trpc = createTRPCReact<AppRouter>();

export function createTrpcClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${getApiUrl()}/trpc`,
        async headers() {
          const headers = new Headers();
          const cookies = await authClient.getCookie();

          if (cookies) {
            headers.set("Cookie", cookies);
          }

          return headers;
        },
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "omit",
          });
        },
      }),
    ],
  });
}
