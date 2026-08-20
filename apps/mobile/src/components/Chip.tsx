import { Pressable, type PressableProps } from "react-native";
import { Text } from "./Text";

type ChipProps = Omit<PressableProps, "children"> & {
  label: string;
  active?: boolean;
};

export function Chip({ label, active = false, ...props }: ChipProps) {
  const containerClass = active
    ? "rounded-r-4 border border-neutral-0 bg-neutral-0 px-s-20 py-s-12 active:opacity-85"
    : "rounded-r-4 border border-border-subtle bg-transparent px-s-20 py-s-12 active:opacity-85";

  return (
    <Pressable className={containerClass} {...props}>
      <Text
        variant="body-1"
        style={{
          fontFamily: "Barlow_700Bold",
          color: active ? "#000000" : "#FEFFF9",
        }}
      >
        {label.toUpperCase()}
      </Text>
    </Pressable>
  );
}
