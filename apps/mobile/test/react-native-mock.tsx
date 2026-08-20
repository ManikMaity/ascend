import React from "react";

type Props = React.PropsWithChildren<Record<string, unknown>>;

type PressableProps = Props & {
  onPress?: () => void;
  disabled?: boolean;
};

export const View = ({ children, ...props }: Props) =>
  React.createElement("div", props, children);

export const Text = ({ children, ...props }: Props) =>
  React.createElement("span", props, children);

export const Pressable = ({ children, onPress, disabled, ...props }: PressableProps) =>
  React.createElement(
    "button",
    {
      ...props,
      type: "button",
      disabled,
      onClick: disabled ? undefined : onPress,
    },
    children,
  );

export const TextInput = (props: Record<string, unknown>) =>
  React.createElement("input", props);

export const ScrollView = ({ children, ...props }: Props) =>
  React.createElement("div", props, children);

export const ActivityIndicator = (props: Record<string, unknown>) =>
  React.createElement("div", { ...props, "data-testid": "activity-indicator" });

export const Platform = { OS: "web", select: (options: Record<string, unknown>) => options.default };

export default {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
};
