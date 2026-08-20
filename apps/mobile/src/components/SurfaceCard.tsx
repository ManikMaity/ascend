import type { ReactNode } from "react";
import { View, type ViewProps } from "react-native";
import { SectionChip } from "./SectionChip";

type SurfaceCardProps = ViewProps & {
  children: ReactNode;
  chipLabel?: string;
};

export function SurfaceCard({ children, chipLabel, ...props }: SurfaceCardProps) {
  return (
    <View
      className="rounded-r-4 border border-border-subtle border-l-2 border-l-primary-500 bg-surface p-s-20"
      {...props}
    >
      {chipLabel ? (
        <View className="mb-s-16 self-start">
          <SectionChip label={chipLabel} />
        </View>
      ) : null}
      {children}
    </View>
  );
}
