import Constants from "expo-constants";

// Determines the API URL based on environment
export const getApiUrl = (): string => {
  // For production
  if (process.env.NODE_ENV === "production") {
    return "https://production-api.com/api/submit"; // TODO: replace with a deployed backend URL
  }

  // For local development with Expo Go
  // Get the debugger host from expoConfig
  const debuggerHost = Constants.expoConfig?.hostUri;

  if (debuggerHost) {
    // Extract just the IP address and remove port if present
    const host = debuggerHost.split(":").shift();
    return `http://${host}:3000/api/submit`;
  }

  // Fallback for development
  return "http://localhost:3000/api/submit";
};
