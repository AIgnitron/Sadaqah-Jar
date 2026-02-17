import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";
import { formatCurrency } from "../utils/format";

type JarMeterProps = {
  total: number;
  goal: number;
};

export default function JarMeter({ total, goal }: JarMeterProps) {
  const progress = Math.min(total / goal, 1);
  const fillHeight = 160 * progress;

  return (
    <View style={styles.container}>
      <View style={styles.jar}>
        <View style={[styles.fill, { height: fillHeight }]} />
      </View>
      <View style={styles.labels}>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
        <Text style={styles.goal}>Goal: {formatCurrency(goal)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.md,
  },
  jar: {
    width: 120,
    height: 180,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.jarOutline,
    overflow: "hidden",
    backgroundColor: colors.card,
    justifyContent: "flex-end",
  },
  fill: {
    backgroundColor: colors.jarFill,
    width: "100%",
  },
  labels: {
    alignItems: "center",
  },
  total: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.text,
  },
  goal: {
    fontSize: typography.caption,
    color: colors.muted,
  },
});
