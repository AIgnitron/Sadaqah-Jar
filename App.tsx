import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import { initDb, seedDb } from "./src/db/database";
import { colors } from "./src/theme";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const setup = async () => {
      try {
        await initDb();
        await seedDb();
      } catch (error) {
        console.warn("Database init failed", error);
      } finally {
        if (isMounted) {
          setReady(true);
        }
      }
    };

    setup();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}