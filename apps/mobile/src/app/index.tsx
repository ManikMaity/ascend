import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { HealthStatus } from "@/features/health/components/HealthStatus";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="mb-4 text-3xl font-bold text-gray-900">Ascend</Text>
      <Text className="mb-8 text-center text-base text-gray-600">
        Full-stack monorepo foundation
      </Text>
      <HealthStatus />
      <StatusBar style="auto" />
    </View>
  );
}
