import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

import HomeScreen from './screens/HomeScreen';
import ScoresScreen from './screens/ScoresScreen';
import FixturesScreen from './screens/FixturesScreen';
import TableScreen from './screens/TableScreen';
import StatsScreen from './screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#2563eb',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarStyle: {
              height: 65,
              paddingBottom: 10,
              paddingTop: 5,
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#e5e7eb',
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View className="items-center justify-center">
                  <Text style={{ fontSize: 24, color }}>🏠</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Scores"
            component={ScoresScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View className="items-center justify-center">
                  <Text style={{ fontSize: 24, color }}>🏏</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Fixtures"
            component={FixturesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View className="items-center justify-center">
                  <Text style={{ fontSize: 24, color }}>📅</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Table"
            component={TableScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View className="items-center justify-center">
                  <Text style={{ fontSize: 24, color }}>🏆</Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Stats"
            component={StatsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <View className="items-center justify-center">
                  <Text style={{ fontSize: 24, color }}>📊</Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
