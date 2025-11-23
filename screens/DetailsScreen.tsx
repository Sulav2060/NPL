import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NPL_TEAMS } from "./components/constants/data"; // Adjust path
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Biratnagar_logo from "./components/constants/biratnagar_logo.png";
import Janakpur_logo from "./components/constants/janakpur_logo.png";
import Karnali_logo from "./components/constants/karnali_logo.png";
import Ktm_logo from "./components/constants/ktm_logo.png";
import Lumbini_logo from "./components/constants/lumbini_logo.png";
import Pkr_logo from "./components/constants/pkr_logo.png";
import Rhinos_logo from "./components/constants/rhinos-logo.webp";
import Sudurpachim_logo from "./components/constants/sudurpachim_logo.png";

// --- Logo Mapping ---
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

const { width } = Dimensions.get("window");
const CARD_SPACING = 12;
const CARD_WIDTH = (width - 32 - CARD_SPACING) / 2;

type RootStackParamList = {
  Details: undefined;
  Team: { id: string };
};

type DetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Details">;
};

interface Player {
  id: string;
  name: string;
  role: string;
  matches: number;
  runs: number;
  wickets: number;
  image: string;
}

interface Team {
  id: string;
  name: string;
  location: string;
  logo: string;
  color: string;
  players: Player[];
}

export default function DetailsScreen({ navigation }: DetailsScreenProps) {
  const renderTeamCard = ({ item }: { item: Team }) => {
    const localLogo = TEAM_LOGOS[item.id] || { uri: item.logo };

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={{ width: CARD_WIDTH }}
        className="mb-4 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 h-48 relative shadow-sm border border-gray-100 dark:border-gray-800"
        onPress={() => navigation.navigate("Team", { id: item.id })} // ✅ Use navigation
      >
        <View
          style={{ backgroundColor: item.color }}
          className="absolute inset-0 opacity-[0.8]"
        />
        <View className="absolute inset-0 items-center justify-center overflow-hidden">
          <Image
            source={localLogo}
            className="w-56 h-56 opacity-[0.1]"
            resizeMode="contain"
            style={{ transform: [{ scale: 1.5 }, { rotate: "-15deg" }] }}
          />
        </View>
        <View className="flex-1 items-center justify-center pt-4 pb-8">
          <Image
            source={localLogo}
            className="w-24 h-24"
            resizeMode="contain"
          />
        </View>
        <View className="absolute bottom-0 left-0 right-0 py-3 px-2 justify-center items-center  backdrop-blur-md">
          <Text
            className="text-white dark:text-white font-bold text-sm text-center uppercase tracking-wider"
            numberOfLines={1}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
      {/* Header */}
      <View className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
          Nepal Premier League
        </Text>
        <Text className="text-3xl font-black text-gray-900 dark:text-white italic">
          DETAILS
        </Text>
      </View>
      <FlatList
        data={NPL_TEAMS}
        renderItem={renderTeamCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
