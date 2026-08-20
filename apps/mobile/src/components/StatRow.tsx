import { View } from "react-native";
import { Text } from "./Text";

type StatRowProps = {
  label: string;
  value: string | number;
};

export function StatRow({ label, value }: StatRowProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-border-subtle py-s-16">
      <Text variant="caption" muted style={{ letterSpacing: 1 }}>
        {label.toUpperCase()}
      </Text>
      <Text variant="metric">{value}</Text>
    </View>
  );
}
