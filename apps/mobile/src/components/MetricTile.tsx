import type { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "./Text";

type MetricTileProps = {
  label: string;
  value: string;
  icon?: ReactNode;
};

export function MetricTile({ label, value, icon }: MetricTileProps) {
  return (
    <View className="flex-1 gap-s-12 rounded-r-4 border border-border-subtle bg-canvas p-s-16">
      {icon}
      <Text variant="metric">{value}</Text>
      <Text variant="caption" muted style={{ letterSpacing: 1 }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}
