import { View } from "react-native";
import { Text } from "./Text";
import { monoFontFamily } from "@/lib/tokens/shape";

type BadgeProps = {
  label: string;
  dot?: boolean;
};

export function Badge({ label, dot = false }: BadgeProps) {
  return (
    <View className="flex-row items-center gap-s-8 self-start rounded-r-4 border border-border-subtle bg-transparent px-s-12 py-s-6">
      {dot ? <View className="h-2 w-2 bg-primary-500" /> : null}
      <Text
        variant="caption"
        style={{ fontFamily: monoFontFamily, letterSpacing: 1 }}
      >
        {label.toUpperCase()}
      </Text>
    </View>
  );
}
