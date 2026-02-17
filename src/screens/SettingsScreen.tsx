import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { colors, spacing, typography } from "../theme";

export default function SettingsScreen() {
  const [goal, setGoal] = useState("200");

  const handleSave = () => {
    Alert.alert("Saved", `Weekly goal updated to $${goal}.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jar settings</Text>
      <Text style={styles.label}>Weekly goal amount</Text>
      <TextInput
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
        keyboardType="decimal-pad"
      />
      <PrimaryButton label="Save" onPress={handleSave} />
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
  },
  label: {
    fontSize: typography.caption,
    color: colors.muted,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.sm,
    backgroundColor: colors.card,
    fontSize: typography.body,
  },
});
