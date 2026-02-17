import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, spacing, typography } from "../theme";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export default function PrimaryButton({
  label,
  onPress,
  variant = "primary",
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          variant === "primary" ? styles.primaryLabel : styles.secondaryLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  label: {
    fontSize: typography.body,
    fontWeight: "600",
  },
  primaryLabel: {
    color: "white",
  },
  secondaryLabel: {
    color: colors.text,
  },
});
