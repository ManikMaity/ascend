import type { ReactNode } from "react";
import { View } from "react-native";
import { ListRow } from "./ListRow";
import { MetricTile } from "./MetricTile";
import { Text } from "./Text";
import { monoFontFamily } from "@/lib/tokens/shape";

type WorkoutCardProps = {
  title: string;
  subtitle?: string;
  duration?: string;
  calories?: string;
  thumbnail?: ReactNode;
};

export function WorkoutCard({
  title,
  subtitle,
  duration,
  calories,
  thumbnail,
}: WorkoutCardProps) {
  const thumb = thumbnail ?? (
    <View className="h-20 w-20 items-center justify-center rounded-r-4 border border-border-subtle bg-canvas">
      <Text
        variant="caption"
        muted
        style={{ fontFamily: monoFontFamily, letterSpacing: 1 }}
      >
        IMG
      </Text>
    </View>
  );

  return (
    <View className="gap-s-16">
      <ListRow
        title={title}
        subtitle={subtitle}
        thumbnail={thumb}
        trailing={
          <Text variant="body-2" muted>
            ›
          </Text>
        }
      />
      {duration || calories ? (
        <View className="flex-row gap-s-12">
          {duration ? <MetricTile label="Duration" value={duration} /> : null}
          {calories ? <MetricTile label="Kcal" value={calories} /> : null}
        </View>
      ) : null}
    </View>
  );
}
