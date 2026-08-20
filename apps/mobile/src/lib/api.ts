import Constants from "expo-constants";
import { Platform } from "react-native";

const DEFAULT_PORT = 3001;

function getDevHost(): string | null {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    return hostUri.split(":")[0] ?? null;
  }

  const debuggerHost = Constants.expoGoConfig?.debuggerHost;
  if (debuggerHost) {
    return debuggerHost.split(":")[0] ?? null;
  }

  return null;
}

function isLoopbackHost(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1";
}

function resolveApiUrl(envUrl: string | undefined): string {
  const devHost = getDevHost();

  if (envUrl) {
    try {
      const parsed = new URL(envUrl);
      const port = parsed.port || String(DEFAULT_PORT);

      if (isLoopbackHost(parsed.hostname) && devHost && Platform.OS !== "web") {
        return `${parsed.protocol}//${devHost}:${port}`;
      }

      return envUrl;
    } catch {
      return envUrl;
    }
  }

  if (devHost) {
    return `http://${devHost}:${DEFAULT_PORT}`;
  }

  return `http://localhost:${DEFAULT_PORT}`;
}

export function getApiUrl() {
  return resolveApiUrl(process.env.EXPO_PUBLIC_API_URL);
}

export function getAuthUrl() {
  return resolveApiUrl(process.env.EXPO_PUBLIC_AUTH_URL);
}
