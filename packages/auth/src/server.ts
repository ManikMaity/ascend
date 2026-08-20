import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@ascend/db";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3001";

const isProduction = process.env.NODE_ENV === "production";

// Dev: skip origin/callback validation (Expo Go uses exp:// + LAN URLs).
const disableOriginCheck =
  !isProduction && process.env.BETTER_AUTH_DISABLE_ORIGIN_CHECK !== "false";

if (
  !isProduction &&
  baseURL.includes("localhost") &&
  process.env.BETTER_AUTH_ALLOW_LOCALHOST !== "true"
) {
  console.warn(
    "[auth] BETTER_AUTH_URL uses localhost. Physical devices cannot complete OAuth " +
      "because Google redirects the phone browser to localhost. " +
      "Set BETTER_AUTH_URL=http://<your-lan-ip>:3001 and add that redirect URI in Google Cloud Console.",
  );
}

export const auth = betterAuth({
  baseURL,
  basePath: "/api/auth",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [expo()],
  trustedOrigins: [
    baseURL,
    "ascend://",
    "ascend:///",
    ...(isProduction
      ? []
      : [
          "exp://",
          "exp://**",
          "exp://192.168.*.*:*/**",
          "exp://10.0.*.*:*/**",
        ]),
    ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean) ?? []),
  ],
  advanced: {
    disableOriginCheck,
  },
});

export type Auth = typeof auth;
