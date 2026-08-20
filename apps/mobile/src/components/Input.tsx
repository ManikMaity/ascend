import { useState, type ReactNode } from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { Text } from "./Text";
import { monoFontFamily } from "@/lib/tokens/shape";

type InputProps = TextInputProps & {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);

  const fieldClass = "min-h-14 flex-1 text-body-1 text-neutral-0";

  const containerClass = hasError
    ? "min-h-14 flex-row items-center gap-s-12 rounded-r-4 border border-error-500 bg-canvas px-s-20"
    : focused
      ? "min-h-14 flex-row items-center gap-s-12 rounded-r-4 border border-neutral-0 bg-canvas px-s-20"
      : "min-h-14 flex-row items-center gap-s-12 rounded-r-4 border border-border-subtle bg-canvas px-s-20";

  return (
    <View className="gap-s-12">
      <Text variant="caption" muted style={{ letterSpacing: 1 }}>
        {label.toUpperCase()}
      </Text>
      <View className={containerClass}>
        {leftIcon}
        <TextInput
          className={fieldClass}
          placeholderTextColor="#616161"
          style={{ fontFamily: monoFontFamily, fontSize: 16 }}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...props}
        />
        {rightIcon}
      </View>
      {hasError ? (
        <Text variant="body-2" style={{ color: "#F95D25" }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
