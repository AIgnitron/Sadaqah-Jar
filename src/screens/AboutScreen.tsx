import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SectionCard from "../components/SectionCard";
import { colors, spacing, typography } from "../theme";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <SectionCard>
        <Text style={styles.title}>About Sadaqah Jar</Text>
        <Text style={styles.body}>
          Sadaqah Jar helps you track small acts of giving, celebrate your weekly
          progress, and discover new ways to support your community.
        </Text>
      </SectionCard>

      <SectionCard>
        <Text style={styles.title}>How it works</Text>
        <Text style={styles.body}>
          Log each donation, add a note, and watch your jar fill up. Your weekly
          recap keeps you motivated and mindful.
        </Text>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.subtitle,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: typography.body,
    color: colors.muted,
    lineHeight: 22,
  },
});
