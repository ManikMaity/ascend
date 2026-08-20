import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { Button, Screen, Text } from "@/components";
import { HealthStatus } from "@/features/health/components/HealthStatus";

const devRoutes = [
  { href: "/design-system", label: "Design System" },
] as const;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerClassName="gap-s-24 py-s-24">
        <View className="gap-s-8">
          <Text variant="headline-1">Ascend</Text>
          <Text variant="body-1" muted>
            Dev hub — navigate to test screens and components.
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
      </ScrollView>
      <StatusBar style="light" />
    </Screen>
  );
}
