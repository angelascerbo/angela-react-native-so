import {
  Text,
  StyleSheet,
  View,
  useColorScheme,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Button from "./components/Button";
import AccessibleTextInput from "./components/AccessibleTextInput";
import { validateEmail } from "./utils/validateEmail";
import { getApiUrl } from "./utils/getApiUrl";

export default function App() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const API_URL = getApiUrl();

  const handleSubmit = async () => {
    // Basic validation for empty fields
    if (!name.trim() || !email.trim()) {
      setAlert({ type: "error", message: "Name and email are required" });
      return;
    }
    // Basic validation for invalid email format
    if (!validateEmail(email)) {
      setAlert({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    // Set state to disable inputs and show feedback on button
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAlert({
          type: "success",
          message: data.message || "Form submitted successfully!",
        });
        // Clear the form
        setName("");
        setEmail("");
      } else {
        setAlert({
          type: "error",
          message: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlert({
        type: "error",
        message: "Failed to connect to server. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Remove keyboard when tapping outside the form
    // accessible={false} is required to ensure the individual inputs are accessible through assistive technology
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, themeContainerStyle]}>
        <Text style={[styles.textLg, themeTextStyle]}>Contact form:</Text>

        <AccessibleTextInput
          inputValue={name}
          onChangeText={setName}
          placeholderText="Name"
          accessibilityLabel="Name input"
          disabled={isSubmitting}
        />

        <AccessibleTextInput
          inputValue={email}
          onChangeText={setEmail}
          placeholderText="Email"
          accessibilityLabel="Email input"
          disabled={isSubmitting}
          keyboardType="email-address"
        />
        {alert && (
          <Text
            style={[
              styles.alert,
              themeTextStyle,
              styles.textSm,
              alert.type === "error" ? styles.error : {},
            ]}
          >
            {alert.message}
          </Text>
        )}

        <Button
          onPress={() => handleSubmit()}
          title="Submit"
          accessibilityLabel="Submit the form"
          disabled={isSubmitting}
        />
        <StatusBar />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textSm: {
    fontSize: 20,
  },
  textLg: {
    fontSize: 34,
  },
  lightContainer: {
    backgroundColor: "#ffffffbf",
  },
  darkContainer: {
    backgroundColor: "#242c40",
  },
  lightThemeText: {
    color: "#242c40",
  },
  darkThemeText: {
    color: "#ffffffbf",
  },
  alert: {
    marginBottom: 8,
  },
  error: {
    fontSize: 16,
    color: "#ff4d4d",
  },
});
