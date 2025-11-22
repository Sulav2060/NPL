import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import NPL_TEAMS, { Team } from "./components/constants/data";
import { calculateTable } from "./components/constants/tableLogic";
import { TableHeader, TableRow, TEAM_LOGOS } from "./components/TableComponent";

// --- Types ---
type Match = {
  id: string;
  team1: string;
  team2: string;
  time: string;
  title?: string;
  specialType?: "qualifier" | "eliminator" | "final";
  fullDate: Date;
};

export default function MatchDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { match } = route.params as { match: Match };
  const [activeTab, setActiveTab] = useState<"info" | "squad" | "table">("info");

  const team1Data = NPL_TEAMS.find((t) => t.name === match.team1);
  const team2Data = NPL_TEAMS.find((t) => t.name === match.team2);

  const tableData = useMemo(() => calculateTable(), []);

  const renderHeader = () => (
    <View className="bg-white dark:bg-gray-900 pb-4 border-b border-gray-200 dark:border-gray-800">
      <View className="px-4 pt-2 flex-row items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 -ml-2"
        >
          <Ionicons name="arrow-back" size={24} color="#4b5563" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900 dark:text-white ml-2">
          Match Details
        </Text>
      </View>

      <View className="flex-row justify-between items-center px-8 mt-4">
        <View className="items-center w-1/3">
          <Image
            source={TEAM_LOGOS[match.team1]}
            className="w-16 h-16 mb-2"
            resizeMode="contain"
          />
          <Text className="text-xs font-bold text-center text-gray-900 dark:text-white">
            {match.team1}
          </Text>
        </View>

        <View className="items-center w-1/3">
          <Text className="text-xs font-bold text-gray-500 mb-1">
            {match.time}
          </Text>
          <View className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            <Text className="text-xs font-bold text-gray-600 dark:text-gray-300">
              VS
            </Text>
          </View>
        </View>

        <View className="items-center w-1/3">
          <Image
            source={TEAM_LOGOS[match.team2]}
            className="w-16 h-16 mb-2"
            resizeMode="contain"
          />
          <Text className="text-xs font-bold text-center text-gray-900 dark:text-white">
            {match.team2}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View className="flex-row bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {["info", "squad", "table"].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab as any)}
          className={`flex-1 py-3 items-center border-b-2 ${
            activeTab === tab
              ? "border-blue-600"
              : "border-transparent"
          }`}
        >
          <Text
            className={`text-sm font-bold uppercase ${
              activeTab === tab
                ? "text-blue-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderInfo = () => (
    <View className="p-4">
      <View className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-4">
        <Text className="text-sm font-bold text-gray-500 mb-2 uppercase">
          Match Info
        </Text>
        <View className="flex-row justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <Text className="text-gray-600 dark:text-gray-300">Date</Text>
          <Text className="font-bold text-gray-900 dark:text-white">
            {new Date(match.fullDate).toDateString()}
          </Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <Text className="text-gray-600 dark:text-gray-300">Time</Text>
          <Text className="font-bold text-gray-900 dark:text-white">
            {match.time}
          </Text>
        </View>
        <View className="flex-row justify-between py-2">
          <Text className="text-gray-600 dark:text-gray-300">Venue</Text>
          <Text className="font-bold text-gray-900 dark:text-white">
            TU Cricket Ground
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSquadList = (teamName: string, teamData?: Team) => (
    <View className="mb-6">
      <View className="flex-row items-center mb-3 px-4">
        <Image
          source={TEAM_LOGOS[teamName]}
          className="w-6 h-6 mr-2"
          resizeMode="contain"
        />
        <Text className="text-lg font-bold text-gray-900 dark:text-white">
          {teamName}
        </Text>
      </View>
      
      {teamData?.players.map((player, index) => (
        <View
          key={player.id}
          className="flex-row items-center bg-white dark:bg-gray-900 p-3 mx-4 mb-2 rounded-lg border border-gray-100 dark:border-gray-800"
        >
          <Image
            source={{ uri: player.image || "https://via.placeholder.com/50" }}
            className="w-10 h-10 rounded-full bg-gray-200 mr-3"
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-900 dark:text-white">
              {player.name}
            </Text>
            <Text className="text-xs text-gray-500">{player.role}</Text>
          </View>
          <View className="flex-row">
            {player.captain && (
              <View className="bg-yellow-100 px-2 py-1 rounded mr-1">
                <Text className="text-[10px] font-bold text-yellow-700">C</Text>
              </View>
            )}
            {player.wicketKeeper && (
              <View className="bg-blue-100 px-2 py-1 rounded">
                <Text className="text-[10px] font-bold text-blue-700">WK</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderSquads = () => (
    <ScrollView className="flex-1 pt-4">
      {renderSquadList(match.team1, team1Data)}
      {renderSquadList(match.team2, team2Data)}
    </ScrollView>
  );

  const renderTable = () => (
    <ScrollView className="flex-1 p-4">
      <View className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <TableHeader />
        {tableData.map((team, index) => (
          <TableRow
            key={team.name}
            item={team}
            index={index}
            highlightTeams={[match.team1, match.team2]}
          />
        ))}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      {renderHeader()}
      {renderTabs()}
      <View className="flex-1">
        {activeTab === "info" && renderInfo()}
        {activeTab === "squad" && renderSquads()}
        {activeTab === "table" && renderTable()}
      </View>
    </SafeAreaView>
  );
}
