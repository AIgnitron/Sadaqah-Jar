import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getEntries, getWeeklySummary } from "../db/database";
import EntryCard from "../components/EntryCard";
import SectionCard from "../components/SectionCard";
import { colors, spacing, typography } from "../theme";
import { Entry } from "../types";
import { formatCurrency } from "../utils/format";

export default function WeeklyRecapScreen() {
  const [summary, setSummary] = useState({ total: 0, count: 0 });
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const load = async () => {
      const [summaryData, entryData] = await Promise.all([
        getWeeklySummary(),
        getEntries(),
      ]);
      setSummary(summaryData);
      setEntries(entryData.slice(0, 7));
    };

    load();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionCard>
        <Text style={styles.title}>Weekly recap</Text>
        <Text style={styles.total}>{formatCurrency(summary.total)}</Text>
        <Text style={styles.caption}>{summary.count} entries in 7 days</Text>
      </SectionCard>

      <View style={styles.list}>
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>No entries yet this week.</Text>
        ) : (
          entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.subtitle,
    fontWeight: "600",
    color: colors.text,
  },
  total: {
    fontSize: typography.title,
    fontWeight: "700",
    marginTop: spacing.sm,
    color: colors.text,
  },
  caption: {
    fontSize: typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  list: {
    gap: spacing.sm,
  },
  emptyText: {
    color: colors.muted,
    fontSize: typography.body,
  },
});
