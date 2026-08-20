import { View } from "react-native";
import { Text } from "./Text";

type SectionChipProps = {
  label: string;
};

export function SectionChip({ label }: SectionChipProps) {
  return (
    <View className="self-start rounded-r-4 border border-primary-500 px-s-12 py-s-6">
      <Text
        variant="caption"
        style={{
          fontFamily: "Barlow_700Bold",
          color: "#1A7AFF",
          letterSpacing: 2,
        }}
      >
        {label.toUpperCase()}
      </Text>
    </View>
  );
}
