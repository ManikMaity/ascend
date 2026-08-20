import { View } from "react-native";
import { Text } from "./Text";
import { clampProgress } from "./ProgressBar";
import { monoFontFamily } from "@/lib/tokens/shape";

type ProgressRingProps = {
  value: number;
  size?: number;
  label?: string;
};

const RING_SEGMENTS = 12;

function CornerTick({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const positionClass =
    position === "tl"
      ? "absolute left-0 top-0 border-l-2 border-t-2 border-primary-500"
      : position === "tr"
        ? "absolute right-0 top-0 border-r-2 border-t-2 border-primary-500"
        : position === "bl"
          ? "absolute bottom-0 left-0 border-b-2 border-l-2 border-primary-500"
          : "absolute bottom-0 right-0 border-b-2 border-r-2 border-primary-500";

  return <View className={"h-4 w-4 " + positionClass} />;
}

export function ProgressRing({
  value,
  size = 128,
  label,
}: ProgressRingProps) {
  const progress = clampProgress(value);
  const filled = Math.round((progress / 100) * RING_SEGMENTS);

  return (
    <View
      className="justify-between rounded-r-4 border border-border-subtle bg-canvas p-s-16"
      style={{ width: size, height: size }}
    >
      <CornerTick position="tl" />
      <CornerTick position="tr" />
      <CornerTick position="bl" />
      <CornerTick position="br" />

      <View className="flex-1 items-center justify-center">
        <Text
          variant="metric"
          style={{ fontFamily: monoFontFamily, letterSpacing: 1 }}
        >
          {label ?? `${progress}%`}
        </Text>
      </View>

      <View className="flex-row gap-1">
        {Array.from({ length: RING_SEGMENTS }, (_, index) => {
          const segmentClass =
            index < filled
              ? "h-3 flex-1 bg-neutral-0"
              : "h-3 flex-1 bg-surface-raised";

          return <View key={index} className={segmentClass} />;
        })}
      </View>
    </View>
  );
}
