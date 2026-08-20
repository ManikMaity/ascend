import { Redirect, Stack, type Href } from "expo-router";
import { AuthLoadingScreen } from "@/features/auth/components/auth-loading-screen";
import { authClient } from "@/lib/auth-client";

const HOME_ROUTE = "/" as Href;

export default function AuthLayout() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <AuthLoadingScreen />;
  }

  if (session) {
    return <Redirect href={HOME_ROUTE} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
