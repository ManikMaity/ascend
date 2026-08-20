import { View } from "react-native";
import { spacing, type SpacingToken } from "@/lib/tokens/spacing";

type SpacerProps = {
  size: SpacingToken;
};

export function Spacer({ size }: SpacerProps) {
  return <View style={{ height: spacing[size] }} />;
}
