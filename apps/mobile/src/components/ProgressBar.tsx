import { View } from "react-native";

type ProgressBarProps = {
  value: number;
  segments?: number;
};

const DEFAULT_SEGMENTS = 24;

export function clampProgress(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function ProgressBar({ value, segments = DEFAULT_SEGMENTS }: ProgressBarProps) {
  const progress = clampProgress(value);
  const filled = Math.round((progress / 100) * segments);

  return (
    <View className="flex-row gap-1">
      {Array.from({ length: segments }, (_, index) => {
        const segmentClass =
          index < filled
            ? "h-4 flex-1 rounded-r-4 bg-primary-500"
            : "h-4 flex-1 rounded-r-4 bg-surface-raised";

        return <View key={index} className={segmentClass} />;
      })}
    </View>
  );
}
