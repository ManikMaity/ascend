import { createAscendAuthClient, expoClient, type AscendAuthClient } from "@ascend/auth/client";
import * as SecureStore from "expo-secure-store";
import { getAuthUrl } from "./api";

type AuthClientWithCookie = AscendAuthClient & {
  getCookie: () => Promise<string | null>;
};

export const authClient = createAscendAuthClient({
  baseURL: getAuthUrl(),
  plugins: [
    expoClient({
      scheme: "ascend",
      storagePrefix: "ascend",
      storage: SecureStore,
    }),
  ],
}) as AuthClientWithCookie;
