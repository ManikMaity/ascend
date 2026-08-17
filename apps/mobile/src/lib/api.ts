import Constants from "expo-constants";

export function getApiUrl() {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(":")[0];
    return `http://${host}:3000`;
  }

  return "http://localhost:3000";
}

export function getAuthUrl() {
  return process.env.EXPO_PUBLIC_AUTH_URL ?? getApiUrl();
}
