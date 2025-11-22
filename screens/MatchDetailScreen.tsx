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
import { calculateTable, MATCH_RESULTS } from "./components/constants/tableLogic";
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
  const [activeTab, setActiveTab] = useState<"info" | "squad" | "table" | "score">("info");

  const team1Data = NPL_TEAMS.find((t) => t.name === match.team1);
  const team2Data = NPL_TEAMS.find((t) => t.name === match.team2);

  const tableData = useMemo(() => calculateTable(), []);

  const result = MATCH_RESULTS.find(
    (r) =>
      (r.team1 === match.team1 && r.team2 === match.team2) ||
      (r.team1 === match.team2 && r.team2 === match.team1)
  );

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
          <Text className="text-xs font-bold text-center text-gray-900 dark:text-white mb-1">
            {match.team1}
          </Text>
          {result && (
            <Text className="text-sm font-extrabold text-gray-900 dark:text-white">
              {result.team1 === match.team1
                ? `${result.t1Score.runs}/${result.t1Score.wickets}`
                : `${result.t2Score.runs}/${result.t2Score.wickets}`}
            </Text>
          )}
          {result && (
            <Text className="text-[10px] text-gray-500">
              {result.team1 === match.team1
                ? `(${result.t1Score.overs} ov)`
                : `(${result.t2Score.overs} ov)`}
            </Text>
          )}
        </View>

        <View className="items-center w-1/3">
          {result ? (
            <View className="items-center">
              <Text className="text-[10px] font-bold text-gray-500 uppercase mb-1">
                Result
              </Text>
              <View className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded mb-1">
                <Text className="text-[10px] font-bold text-green-700 dark:text-green-300 text-center">
                  {result.winner === "team1"
                    ? match.team1 === result.team1
                      ? `${match.team1} Won`
                      : `${match.team2} Won`
                    : result.winner === "team2"
                    ? match.team2 === result.team2
                      ? `${match.team2} Won`
                      : `${match.team1} Won`
                    : "Draw/Tie"}
                </Text>
              </View>
            </View>
          ) : (
            <>
              <Text className="text-xs font-bold text-gray-500 mb-1">
                {match.time}
              </Text>
              <View className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                <Text className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  VS
                </Text>
              </View>
            </>
          )}
        </View>

        <View className="items-center w-1/3">
          <Image
            source={TEAM_LOGOS[match.team2]}
            className="w-16 h-16 mb-2"
            resizeMode="contain"
          />
          <Text className="text-xs font-bold text-center text-gray-900 dark:text-white mb-1">
            {match.team2}
          </Text>
          {result && (
            <Text className="text-sm font-extrabold text-gray-900 dark:text-white">
              {result.team2 === match.team2
                ? `${result.t2Score.runs}/${result.t2Score.wickets}`
                : `${result.t1Score.runs}/${result.t1Score.wickets}`}
            </Text>
          )}
          {result && (
            <Text className="text-[10px] text-gray-500">
              {result.team2 === match.team2
                ? `(${result.t2Score.overs} ov)`
                : `(${result.t1Score.overs} ov)`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View className="flex-row bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {["info", "score", "squad", "table"].map((tab) => (
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

  const renderScore = () => {
    if (!result) {
      return (
        <View className="flex-1 items-center justify-center p-8">
          <Text className="text-gray-500 text-center">
            Match has not started yet. Scores will be available once the match begins.
          </Text>
        </View>
      );
    }

    const t1 = result.team1 === match.team1 ? result.t1Score : result.t2Score;
    const t2 = result.team2 === match.team2 ? result.t2Score : result.t1Score;

    return (
      <ScrollView className="flex-1 p-4">
        {/* Team 1 Scorecard Summary */}
        <View className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <Image
                source={TEAM_LOGOS[match.team1]}
                className="w-6 h-6 mr-2"
                resizeMode="contain"
              />
              <Text className="font-bold text-gray-900 dark:text-white">
                {match.team1}
              </Text>
            </View>
            <Text className="font-extrabold text-lg text-gray-900 dark:text-white">
              {t1.runs}/{t1.wickets}
            </Text>
          </View>
          <Text className="text-xs text-gray-500 text-right">
            {t1.overs} Overs
          </Text>
        </View>

        {/* Team 2 Scorecard Summary */}
        <View className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <Image
                source={TEAM_LOGOS[match.team2]}
                className="w-6 h-6 mr-2"
                resizeMode="contain"
              />
              <Text className="font-bold text-gray-900 dark:text-white">
                {match.team2}
              </Text>
            </View>
            <Text className="font-extrabold text-lg text-gray-900 dark:text-white">
              {t2.runs}/{t2.wickets}
            </Text>
          </View>
          <Text className="text-xs text-gray-500 text-right">
            {t2.overs} Overs
          </Text>
        </View>

        <View className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
          <Text className="text-center text-blue-800 dark:text-blue-300 font-bold text-sm">
            {result.winner === "team1"
              ? match.team1 === result.team1
                ? `${match.team1} won by ...` // Add margin calculation if needed
                : `${match.team2} won by ...`
              : result.winner === "team2"
              ? match.team2 === result.team2
                ? `${match.team2} won by ...`
                : `${match.team1} won by ...`
              : "Match Tied"}
          </Text>
        </View>
      </ScrollView>
    );
  };

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
        {activeTab === "score" && renderScore()}
        {activeTab === "squad" && renderSquads()}
        {activeTab === "table" && renderTable()}
      </View>
    </SafeAreaView>
  );
}
