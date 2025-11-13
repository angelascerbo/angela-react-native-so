import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled: boolean;
  accessibilityLabel: string;
}

export default function Button({
  onPress,
  title,
  disabled,
  accessibilityLabel,
}: ButtonProps) {
  const accessibilityState = { disabled };

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
    >
      <Pressable
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={() => {
          // Dismiss the keyboard when the button is pressed
          Keyboard.dismiss();
          onPress();
        }}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{!disabled ? title : "..."}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 150,
    borderRadius: 20,
    backgroundColor: "#000000bf",
    padding: 10,
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#888888ff",
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffffbf",
    fontWeight: "bold",
    padding: 4,
    textAlign: "center",
  },
});
