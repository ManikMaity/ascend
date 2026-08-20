import { Pressable, type PressableProps } from "react-native";
import { Text } from "./Text";
import { monoFontFamily } from "@/lib/tokens/shape";

type DayPillProps = Omit<PressableProps, "children"> & {
  label: string;
  selected?: boolean;
};

export function DayPill({ label, selected = false, ...props }: DayPillProps) {
  const containerClass = selected
    ? "h-14 w-14 items-center justify-center rounded-r-4 border border-neutral-0 bg-neutral-0 active:opacity-85"
    : "h-14 w-14 items-center justify-center rounded-r-4 border border-border-subtle bg-transparent active:opacity-85";

  return (
    <Pressable className={containerClass} {...props}>
      <Text
        variant="body-2"
        style={{
          fontFamily: monoFontFamily,
          color: selected ? "#000000" : "#FEFFF9",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
