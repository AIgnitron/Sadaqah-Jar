import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";
import { Entry } from "../types";
import { formatCurrency, formatShortDate } from "../utils/format";

type EntryCardProps = {
  entry: Entry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.amount}>{formatCurrency(entry.amount)}</Text>
        <Text style={styles.note}>{entry.note || "No note"}</Text>
      </View>
      <Text style={styles.date}>{formatShortDate(entry.createdAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  amount: {
    fontSize: typography.subtitle,
    fontWeight: "600",
    color: colors.text,
  },
  note: {
    fontSize: typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  date: {
    fontSize: typography.caption,
    color: colors.muted,
  },
});
