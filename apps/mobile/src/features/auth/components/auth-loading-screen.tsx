import { ActivityIndicator, View } from "react-native";

export function AuthLoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-canvas">
      <ActivityIndicator color="#1A7AFF" />
    </View>
  );
}
