import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import JarMeter from "../components/JarMeter";
import PrimaryButton from "../components/PrimaryButton";
import SectionCard from "../components/SectionCard";
import EntryCard from "../components/EntryCard";
import { getEntries, getTotalAmount, getWeeklySummary } from "../db/database";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors, spacing, typography } from "../theme";
import { Entry } from "../types";

const GOAL_AMOUNT = 200;

export default function JarScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [total, setTotal] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [weeklyCount, setWeeklyCount] = useState(0);

  const loadData = useCallback(async () => {
    const [entriesData, totalAmount, weeklySummary] = await Promise.all([
      getEntries(),
      getTotalAmount(),
      getWeeklySummary(),
    ]);

    setEntries(entriesData);
    setTotal(totalAmount);
    setWeeklyTotal(weeklySummary.total);
    setWeeklyCount(weeklySummary.count);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <JarMeter total={total} goal={GOAL_AMOUNT} />

      <SectionCard>
        <Text style={styles.sectionTitle}>This week</Text>
        <Text style={styles.sectionValue}>${weeklyTotal.toFixed(2)}</Text>
        <Text style={styles.sectionCaption}>{weeklyCount} entries</Text>
      </SectionCard>

      <View style={styles.actions}>
        <PrimaryButton
          label="Add Entry"
          onPress={() => navigation.navigate("AddEntry")}
        />
        <PrimaryButton
          label="Ways to Give"
          variant="secondary"
          onPress={() => navigation.navigate("Ideas")}
        />
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="Weekly Recap"
          variant="secondary"
          onPress={() => navigation.navigate("WeeklyRecap")}
        />
        <PrimaryButton
          label="Settings"
          variant="secondary"
          onPress={() => navigation.navigate("Settings")}
        />
      </View>

      <View style={styles.entriesHeader}>
        <Text style={styles.sectionTitle}>Recent entries</Text>
        <PrimaryButton
          label="About"
          variant="secondary"
          onPress={() => navigation.navigate("About")}
        />
      </View>

      <View style={styles.entriesList}>
        {entries.length === 0 ? (
          <Text style={styles.emptyText}>No entries yet. Start giving!</Text>
        ) : (
          entries.slice(0, 5).map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
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
  sectionTitle: {
    fontSize: typography.subtitle,
    fontWeight: "600",
    color: colors.text,
  },
  sectionValue: {
    fontSize: typography.title,
    fontWeight: "700",
    marginTop: spacing.sm,
    color: colors.text,
  },
  sectionCaption: {
    fontSize: typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  entriesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  entriesList: {
    gap: spacing.sm,
  },
  emptyText: {
    color: colors.muted,
    fontSize: typography.body,
  },
});
