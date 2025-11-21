import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NPL_TEAMS } from "../constants/data"; // Adjust path as needed

// Import logos (Adjust path to match your folder structure)
import Biratnagar_logo from "../constants/biratnagar_logo.png";
import Janakpur_logo from "../constants/janakpur_logo.png";
import Karnali_logo from "../constants/karnali_logo.png";
import Ktm_logo from "../constants/ktm_logo.png";
import Lumbini_logo from "../constants/lumbini_logo.png";
import Pkr_logo from "../constants/pkr_logo.png";
import Rhinos_logo from "../constants/rhinos-logo.webp";
import Sudurpachim_logo from "../constants/sudurpachim_logo.png";

const TEAM_LOGOS: Record<string, ImageSourcePropType> = {
  "1": Biratnagar_logo,
  "5": Ktm_logo,
  "2": Rhinos_logo,
  "7": Pkr_logo,
  "3": Janakpur_logo,
  "6": Lumbini_logo,
  "4": Karnali_logo,
  "8": Sudurpachim_logo,
};

export default function TeamDetailScreen({ route, navigation }: any) {
  // GET ID FROM REACT NAVIGATION PARAMS
  const { id } = route.params;

  const team = NPL_TEAMS.find((t) => t.id === id);

  if (!team) {
    return (
      <View>
        <Text>Team not found</Text>
      </View>
    );
  }

  const localLogo = TEAM_LOGOS[team.id] || { uri: team.logo };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={["top"]}>
      {/* Custom Header */}
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Text className="text-2xl text-gray-900 dark:text-white">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          {team.name}
        </Text>
      </View>

      <View className="items-center py-6 border-b border-gray-100 dark:border-gray-800">
        <Image
          source={localLogo}
          className="w-24 h-24 mb-2"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          {team.name}
        </Text>
        <Text className="text-gray-500">{team.location}</Text>
      </View>

      <FlatList
        data={team.players}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center bg-gray-50 dark:bg-gray-900 p-3 mb-3 rounded-xl"
            // NAVIGATE TO PLAYER SCREEN
            onPress={() =>
              navigation.navigate("Player", { id: item.id, teamId: team.id })
            }
          >
            <Image
              source={{ uri: item.image }}
              className="w-12 h-12 rounded-full bg-gray-200 mr-4"
            />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.name}
              </Text>
              <Text className="text-blue-600 dark:text-blue-400 text-sm">
                {item.role}
              </Text>
            </View>
            <Text className="text-gray-300 text-xl">›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
