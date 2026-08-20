import { View } from "react-native";

type DividerProps = {
  inset?: boolean;
};

export function Divider({ inset = false }: DividerProps) {
  const dividerClass = inset
    ? "h-px bg-border-subtle mx-s-16"
    : "h-px bg-border-subtle";

  return <View className={dividerClass} />;
}
