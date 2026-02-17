import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JarScreen from "../screens/JarScreen";
import AddEntryScreen from "../screens/AddEntryScreen";
import IdeasScreen from "../screens/IdeasScreen";
import WeeklyRecapScreen from "../screens/WeeklyRecapScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import { colors } from "../theme";

export type RootStackParamList = {
  Jar: undefined;
  AddEntry: undefined;
  Ideas: undefined;
  WeeklyRecap: undefined;
  Settings: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Jar"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.primary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Jar"
        component={JarScreen}
        options={{ title: "Sadaqah Jar" }}
      />
      <Stack.Screen
        name="AddEntry"
        component={AddEntryScreen}
        options={{ title: "Add Entry" }}
      />
      <Stack.Screen
        name="Ideas"
        component={IdeasScreen}
        options={{ title: "Ways to Give" }}
      />
      <Stack.Screen
        name="WeeklyRecap"
        component={WeeklyRecapScreen}
        options={{ title: "Weekly Recap" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "About" }}
      />
    </Stack.Navigator>
  );
}