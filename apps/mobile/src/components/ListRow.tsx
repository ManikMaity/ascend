import type { ReactNode } from "react";
import { Pressable, View, type PressableProps } from "react-native";
import { Text } from "./Text";

type ListRowProps = Omit<PressableProps, "children"> & {
  title: string;
  subtitle?: string;
  thumbnail?: ReactNode;
  trailing?: ReactNode;
};

export function ListRow({ title, subtitle, thumbnail, trailing, ...props }: ListRowProps) {
  return (
    <Pressable
      className="min-h-[88px] flex-row items-center gap-s-16 rounded-r-4 border border-border-subtle bg-surface p-s-16 active:opacity-85"
      {...props}
    >
      {thumbnail}
      <View className="flex-1 gap-s-8">
        <Text variant="title">{title}</Text>
        {subtitle ? (
          <Text variant="body-2" muted>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing}
    </Pressable>
  );
}
