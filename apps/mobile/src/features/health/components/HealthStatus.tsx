import { ActivityIndicator, Text, View } from "react-native";
import { useHealthQuery } from "../hooks/useHealthQuery";

export function HealthStatus() {
  const { data, isLoading, isError, error } = useHealthQuery();

  if (isLoading) {
    return (
      <View className="items-center gap-2">
        <ActivityIndicator />
        <Text className="text-sm text-gray-500">Checking API health...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
        <Text className="text-sm font-medium text-red-700">API unreachable</Text>
        <Text className="mt-1 text-xs text-red-600">{error?.message ?? "Unknown error"}</Text>
      </View>
    );
  }

  return (
    <View className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
      <Text className="text-sm font-medium text-green-700">{data.message}</Text>
      <Text className="mt-1 text-xs text-green-600">Status: {data.status}</Text>
    </View>
  );
}
