import { View } from "react-native";
import { Text } from "./Text";
import { monoFontFamily } from "@/lib/tokens/shape";

type StatusState = "completed" | "missed" | "waiting";

type StatusCardProps = {
  state: StatusState;
  label: string;
};

function getContainerClassName(state: StatusState): string {
  if (state === "completed") {
    return "h-[120px] w-[120px] items-center justify-center gap-s-12 rounded-r-4 border border-border-subtle border-l-2 border-l-primary-500 bg-canvas";
  }
  if (state === "missed") {
    return "h-[120px] w-[120px] items-center justify-center gap-s-12 rounded-r-4 border border-border-subtle border-l-2 border-l-error-500 bg-canvas";
  }
  return "h-[120px] w-[120px] items-center justify-center gap-s-12 rounded-r-4 border border-border-subtle bg-canvas";
}

function getIcon(state: StatusState): string {
  if (state === "completed") {
    return "OK";
  }
  if (state === "missed") {
    return "X";
  }
  return "--";
}

function getIconColor(state: StatusState): string {
  if (state === "completed") {
    return "#1A7AFF";
  }
  if (state === "missed") {
    return "#F95D25";
  }
  return "#616161";
}

export function StatusCard({ state, label }: StatusCardProps) {
  const containerClass = getContainerClassName(state);

  return (
    <View className={containerClass}>
      <Text
        variant="headline-2"
        style={{ fontFamily: monoFontFamily, color: getIconColor(state) }}
      >
        {getIcon(state)}
      </Text>
      <Text variant="caption" muted style={{ letterSpacing: 1 }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}
