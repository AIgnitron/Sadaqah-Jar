import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getIdeas } from "../db/database";
import SectionCard from "../components/SectionCard";
import { colors, spacing, typography } from "../theme";
import { Idea } from "../types";

export default function IdeasScreen() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const loadIdeas = async () => {
      const data = await getIdeas();
      setIdeas(data);
    };

    loadIdeas();
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={ideas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SectionCard>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </SectionCard>
      )}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.subtitle,
    fontWeight: "600",
    color: colors.text,
  },
  description: {
    marginTop: spacing.sm,
    fontSize: typography.body,
    color: colors.muted,
  },
  category: {
    marginTop: spacing.sm,
    fontSize: typography.caption,
    fontWeight: "600",
    color: colors.primary,
  },
});
