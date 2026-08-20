import { Redirect, Stack, type Href } from "expo-router";
import { AuthLoadingScreen } from "@/features/auth/components/auth-loading-screen";
import { authClient } from "@/lib/auth-client";

const SIGN_IN_ROUTE = "/sign-in" as Href;

export default function AppLayout() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <AuthLoadingScreen />;
  }

  if (!session) {
    return <Redirect href={SIGN_IN_ROUTE} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
