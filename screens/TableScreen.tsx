import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateTable } from "./components/constants/tableLogic";
import { TableHeader, TableRow } from "./components/TableComponent";

export default function TableScreen() {
  // Calculate table data on render
  const tableData = useMemo(() => calculateTable(), []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header Title */}
      <View className="px-6 py-4 bg-white dark:bg-gray-900 mb-3 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
          Season 2
        </Text>
        <Text className="text-3xl font-black text-gray-900 dark:text-white italic">
          STANDINGS
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <TableHeader />
          {tableData.map((team, index) => (
            <TableRow key={team.name} item={team} index={index} />
          ))}
        </View>

        {/* Qualification Legend */}
        <View className="flex-row items-center justify-center mt-4 opacity-60">
          <View className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            Qualified for Playoffs (Top 4)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

