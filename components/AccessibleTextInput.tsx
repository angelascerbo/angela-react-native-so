import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface AccessibleTextInputProps {
  inputValue: string;
  onChangeText: (text: string) => void;
  placeholderText: string;
  accessibilityLabel: string;
  disabled?: boolean;
  keyboardType?: "default" | "email-address";
}

export default function AccessibleTextInput({
  inputValue,
  onChangeText,
  placeholderText,
  accessibilityLabel,
  disabled = false,
  keyboardType = "default",
}: AccessibleTextInputProps) {
  const accessibilityState = { disabled };

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      style={styles.inputContainer}
    >
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor="#585a5dff"
        value={inputValue}
        onChangeText={onChangeText}
        style={styles.input}
        editable={!disabled}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 18,
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#000000bf",
    backgroundColor: "#ffffffbf",
  },
});
