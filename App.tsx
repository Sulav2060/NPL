import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import "./global.css";

import FixturesScreen from "./screens/FixturesScreen";
import TableScreen from "./screens/TableScreen";
import StatsScreen from "./screens/StatsScreen";
import DetailsScreen from "./screens/DetailsScreen";
import TeamDetailScreen from "./screens/components/teams/TeamDetailScreen";
import PlayerDetailScreen from "./screens/components/player/PlayerDetailScreen";
import MatchDetailScreen from "./screens/MatchDetailScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function FixturesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FixturesList" component={FixturesScreen} />
      <Stack.Screen name="MatchDetail" component={MatchDetailScreen} />
    </Stack.Navigator>
  );
}

function DetailsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DetailsList" component={DetailsScreen} />
      <Stack.Screen name="Team" component={TeamDetailScreen} />
      <Stack.Screen name="Player" component={PlayerDetailScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarStyle: {
            height: 55 + (insets.bottom > 0 ? insets.bottom : 10),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
            paddingTop: 5,
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="Fixtures"
          component={FixturesStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Table"
          component={TableScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="trophy" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsStackNavigator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
