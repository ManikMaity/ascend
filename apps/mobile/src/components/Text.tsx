import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { typography, type TextVariant } from "@/lib/tokens/typography";
import { monoFontFamily } from "@/lib/tokens/shape";

type TextProps = RNTextProps & {
  variant?: TextVariant;
  muted?: boolean;
};

function getTextClassName(variant: TextVariant, muted: boolean): string {
  if (variant === "headline-1") {
    return muted
      ? "text-headline-1 font-barlow-bold text-neutral-300"
      : "text-headline-1 font-barlow-bold text-neutral-0";
  }
  if (variant === "headline-2") {
    return muted
      ? "text-headline-2 font-barlow-bold text-neutral-300"
      : "text-headline-2 font-barlow-bold text-neutral-0";
  }
  if (variant === "title") {
    return muted
      ? "text-title font-barlow-medium text-neutral-300"
      : "text-title font-barlow-medium text-neutral-0";
  }
  if (variant === "body-1") {
    return muted
      ? "text-body-1 font-barlow text-neutral-300"
      : "text-body-1 font-barlow text-neutral-0";
  }
  if (variant === "body-2") {
    return muted
      ? "text-body-2 font-barlow text-neutral-300"
      : "text-body-2 font-barlow text-neutral-0";
  }
  if (variant === "caption") {
    return muted
      ? "text-caption font-barlow-medium text-neutral-300"
      : "text-caption font-barlow-medium text-neutral-0";
  }
  return muted
    ? "text-metric text-neutral-300 tabular-nums"
    : "text-metric text-neutral-0 tabular-nums";
}

export function Text({ variant = "body-1", muted = false, style, ...props }: TextProps) {
  const variantClass = getTextClassName(variant, muted);
  const fontStyle =
    variant === "metric"
      ? { fontFamily: monoFontFamily }
      : { fontFamily: typography[variant].fontFamily };

  return <RNText className={variantClass} style={[fontStyle, style]} {...props} />;
}
