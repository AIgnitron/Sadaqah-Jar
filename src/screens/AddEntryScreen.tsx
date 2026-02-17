import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { addEntry } from "../db/database";
import PrimaryButton from "../components/PrimaryButton";
import { colors, spacing, typography } from "../theme";

export default function AddEntryScreen({ navigation }: any) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSave = async () => {
    const value = Number(amount);
    if (!value || value <= 0) {
      Alert.alert("Enter an amount", "Please add a valid amount to save.");
      return;
    }

    await addEntry(value, note.trim());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
        placeholder="25.00"
      />

      <Text style={styles.label}>Note</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={note}
        onChangeText={setNote}
        placeholder="Add a short note"
        multiline
      />

      <PrimaryButton label="Save Entry" onPress={handleSave} />
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
  label: {
    fontSize: typography.caption,
    color: colors.muted,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.sm,
    backgroundColor: colors.card,
    fontSize: typography.body,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
});
