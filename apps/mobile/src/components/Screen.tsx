import type { ReactNode } from "react";
import { SafeAreaView, type SafeAreaViewProps } from "react-native-safe-area-context";

type ScreenProps = SafeAreaViewProps & {
  children: ReactNode;
};

export function Screen({ children, ...props }: ScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-canvas px-s-24" {...props}>
      {children}
    </SafeAreaView>
  );
}
