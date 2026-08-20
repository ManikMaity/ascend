import { Pressable, Text, type PressableProps } from "react-native";

type ButtonVariant = "active" | "stroke" | "disabled" | "error";

type ButtonProps = Omit<PressableProps, "children"> & {
  variant?: ButtonVariant;
  children: string;
  fullWidth?: boolean;
};

function getContainerClassName(
  variant: ButtonVariant,
  fullWidth: boolean,
  isDisabled: boolean,
): string {
  if (fullWidth && (isDisabled || variant === "disabled")) {
    return "min-h-14 w-full items-center justify-center rounded-r-4 bg-neutral-650 px-s-32";
  }
  if (!fullWidth && (isDisabled || variant === "disabled")) {
    return "min-h-14 self-start items-center justify-center rounded-r-4 bg-neutral-650 px-s-32";
  }
  if (fullWidth && variant === "active") {
    return "min-h-14 w-full items-center justify-center rounded-r-4 bg-neutral-0 px-s-32 active:opacity-85";
  }
  if (!fullWidth && variant === "active") {
    return "min-h-14 self-start items-center justify-center rounded-r-4 bg-neutral-0 px-s-32 active:opacity-85";
  }
  if (fullWidth && variant === "stroke") {
    return "min-h-14 w-full items-center justify-center rounded-r-4 border border-neutral-0 bg-transparent px-s-32 active:opacity-85";
  }
  if (!fullWidth && variant === "stroke") {
    return "min-h-14 self-start items-center justify-center rounded-r-4 border border-neutral-0 bg-transparent px-s-32 active:opacity-85";
  }
  if (fullWidth && variant === "error") {
    return "min-h-14 w-full items-center justify-center rounded-r-4 border border-error-500 bg-transparent px-s-32 active:opacity-85";
  }
  return "min-h-14 self-start items-center justify-center rounded-r-4 border border-error-500 bg-transparent px-s-32 active:opacity-85";
}

function getLabelClassName(variant: ButtonVariant, isDisabled: boolean): string {
  if (isDisabled || variant === "disabled") {
    return "text-title text-neutral-300";
  }
  if (variant === "active") {
    return "text-title text-black";
  }
  if (variant === "stroke") {
    return "text-title text-neutral-0";
  }
  return "text-title text-error-500";
}

export function Button({
  variant = "active",
  children,
  fullWidth = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled === true || variant === "disabled";
  const containerClass = getContainerClassName(variant, fullWidth, isDisabled);
  const labelClass = getLabelClassName(variant, isDisabled);

  return (
    <Pressable className={containerClass} disabled={isDisabled} {...props}>
      <Text className={labelClass} style={{ fontFamily: "Barlow_700Bold" }}>
        {children}
      </Text>
    </Pressable>
  );
}
