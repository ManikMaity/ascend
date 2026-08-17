import React from "react";

type Props = React.PropsWithChildren<Record<string, unknown>>;

export const View = ({ children, ...props }: Props) =>
  React.createElement("div", props, children);

export const Text = ({ children, ...props }: Props) =>
  React.createElement("span", props, children);

export const ActivityIndicator = (props: Record<string, unknown>) =>
  React.createElement("div", { ...props, "data-testid": "activity-indicator" });

export const Platform = { OS: "web", select: (options: Record<string, unknown>) => options.default };

export default {
  View,
  Text,
  ActivityIndicator,
  Platform,
};
