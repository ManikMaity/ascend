import { useRouter, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { Button, Screen, Text } from "@/components";
import { HealthStatus } from "@/features/health/components/HealthStatus";
import { authClient } from "@/lib/auth-client";

const devRoutes = [{ href: "/design-system", label: "Design System" }] as const;

const SIGN_IN_ROUTE = "/sign-in" as Href;

export default function HomeScreen() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const displayName = session?.user.name ?? session?.user.email ?? "Hunter";

  async function handleSignOut() {
    await authClient.signOut();
    router.replace(SIGN_IN_ROUTE);
  }

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerClassName="gap-s-24 py-s-24">
        <View className="gap-s-8">
          <Text variant="headline-1">Ascend</Text>
          <Text variant="body-1" muted>
            Welcome, {displayName}
          </Text>
        </View>

        <View className="gap-s-12">
          <Text variant="headline-2">Health</Text>
          <HealthStatus />
        </View>

        <View className="gap-s-12">
          <Text variant="headline-2">Screens</Text>
          {devRoutes.map((route) => (
            <Button
              key={route.href}
              variant="stroke"
              fullWidth
              onPress={() => router.push(route.href)}
            >
              {route.label}
            </Button>
          ))}
        </View>

        <Button variant="stroke" fullWidth onPress={handleSignOut}>
          Sign out
        </Button>
      </ScrollView>
      <StatusBar style="light" />
    </Screen>
  );
}
