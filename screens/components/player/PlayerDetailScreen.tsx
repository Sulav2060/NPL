import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NPL_TEAMS } from "../constants/data";

export default function PlayerDetailScreen({ route, navigation }: any) {
  const { id, teamId } = route.params;

  const team = NPL_TEAMS.find((t) => t.id === teamId);
  const player = team?.players.find((p) => p.id === id);

  if (!player)
    return (
      <View>
        <Text>Player not found</Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top"]}>
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Text className="text-2xl text-gray-900 dark:text-white">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          Player Profile
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="items-center py-10">
          <Image
            source={{ uri: player.image }}
            className="w-32 h-32 rounded-full mb-4 bg-gray-200"
          />
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            {player.name}
          </Text>
          <Text className="text-xl text-blue-600 dark:text-blue-400">
            {player.role}
          </Text>
          <Text className="text-gray-500 mt-2">{team?.name}</Text>
        </View>

        <View className="px-6">
          <Text className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Career Stats
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <StatBox label="Matches" value={player.matches} />
            <StatBox label="Runs" value={player.runs} />
            <StatBox label="Wickets" value={player.wickets} />
            <StatBox label="High Score" value="--" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const StatBox = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View className="bg-gray-50 dark:bg-gray-900 w-[48%] p-4 rounded-lg mb-4 items-center">
    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
      {value}
    </Text>
    <Text className="text-gray-500 text-xs uppercase">{label}</Text>
  </View>
);
