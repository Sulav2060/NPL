import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Mock Images / Placeholders ---
// In a real app, you would import player images or use URLs
const PLAYER_PLACEHOLDER = "https://via.placeholder.com/150";

// --- Types ---
type StatCategory = "BAT_RUNS" | "BAT_SIXES" | "BOWL_WICKETS" | "BOWL_ECO";

type PlayerStat = {
  id: string;
  rank: number;
  name: string;
  team: string;
  value: string | number; // The stat value (e.g. 500, 15, 150.5)
  label: string; // "Runs", "Wickets", "SR"
  image: string;
};

// --- Mock Data ---

const MOST_RUNS: PlayerStat[] = [
  {
    id: "1",
    rank: 1,
    name: "Rohit Paudel",
    team: "Biratnagar Kings",
    value: 345,
    label: "Runs",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "2",
    rank: 2,
    name: "Kushal Bhurtel",
    team: "Kathmandu Gorkhas",
    value: 310,
    label: "Runs",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "3",
    rank: 3,
    name: "Aasif Sheikh",
    team: "Pokhara Avengers",
    value: 289,
    label: "Runs",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "4",
    rank: 4,
    name: "Sandeep Jora",
    team: "Janakpur Bolts",
    value: 250,
    label: "Runs",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "5",
    rank: 5,
    name: "Dipendra S. Airee",
    team: "Lumbini Lions",
    value: 210,
    label: "Runs",
    image: PLAYER_PLACEHOLDER,
  },
];

const MOST_SIXES: PlayerStat[] = [
  {
    id: "1",
    rank: 1,
    name: "Kushal Malla",
    team: "Chitwan Rhinos",
    value: 18,
    label: "Sixes",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "2",
    rank: 2,
    name: "Dipendra S. Airee",
    team: "Lumbini Lions",
    value: 15,
    label: "Sixes",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "3",
    rank: 3,
    name: "Rohit Paudel",
    team: "Biratnagar Kings",
    value: 12,
    label: "Sixes",
    image: PLAYER_PLACEHOLDER,
  },
];

const MOST_WICKETS: PlayerStat[] = [
  {
    id: "1",
    rank: 1,
    name: "Sandeep Lamichhane",
    team: "Biratnagar Kings",
    value: 18,
    label: "Wickets",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "2",
    rank: 2,
    name: "Sompal Kami",
    team: "Kathmandu Gorkhas",
    value: 15,
    label: "Wickets",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "3",
    rank: 3,
    name: "Karan KC",
    team: "Pokhara Avengers",
    value: 14,
    label: "Wickets",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "4",
    rank: 4,
    name: "Lalit Rajbanshi",
    team: "Janakpur Bolts",
    value: 12,
    label: "Wickets",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "5",
    rank: 5,
    name: "Abinash Bohara",
    team: "Karnali Yaks",
    value: 10,
    label: "Wickets",
    image: PLAYER_PLACEHOLDER,
  },
];

const BEST_ECONOMY: PlayerStat[] = [
  {
    id: "1",
    rank: 1,
    name: "Lalit Rajbanshi",
    team: "Janakpur Bolts",
    value: "4.50",
    label: "Econ",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "2",
    rank: 2,
    name: "Sandeep Lamichhane",
    team: "Biratnagar Kings",
    value: "5.10",
    label: "Econ",
    image: PLAYER_PLACEHOLDER,
  },
  {
    id: "3",
    rank: 3,
    name: "Sagar Dhakal",
    team: "Lumbini Lions",
    value: "5.80",
    label: "Econ",
    image: PLAYER_PLACEHOLDER,
  },
];

// --- UI Components ---

const CategoryButton = ({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-2 ${active ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-800"}`}
  >
    <Text
      className={`text-xs font-bold ${active ? "text-white" : "text-gray-600 dark:text-gray-400"}`}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const TopPlayerCard = ({ player }: { player: PlayerStat }) => (
  <View className="items-center mt-4 mb-6">
    <View className="relative">
      {/* Crown Icon */}
      <Text className="absolute -top-6 left-0 right-0 text-center text-3xl z-10">
        👑
      </Text>

      <View className="w-28 h-28 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
        <Image
          source={{ uri: player.image }}
          className="w-full h-full bg-gray-300"
        />
      </View>

      <View className="absolute -bottom-3 bg-yellow-400 px-3 py-1 rounded-full self-center">
        <Text className="text-xs font-bold text-black">RANK #1</Text>
      </View>
    </View>

    <Text className="text-xl font-bold text-gray-900 dark:text-white mt-4">
      {player.name}
    </Text>
    <Text className="text-sm text-gray-500 font-medium mb-2">
      {player.team}
    </Text>

    <View className="bg-blue-50 dark:bg-gray-800 px-6 py-2 rounded-xl items-center">
      <Text className="text-3xl font-black text-blue-600 dark:text-blue-400">
        {player.value}
      </Text>
      <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        {player.label}
      </Text>
    </View>
  </View>
);

const ListItem = ({ item }: { item: PlayerStat }) => (
  <View className="flex-row items-center py-3 px-4 bg-white dark:bg-gray-900 mx-4 mb-2 rounded-xl border border-gray-100 dark:border-gray-800">
    <Text className="text-lg font-bold text-gray-400 w-8 text-center">
      {item.rank}
    </Text>

    <Image
      source={{ uri: item.image }}
      className="w-10 h-10 rounded-full bg-gray-200 mr-3"
    />

    <View className="flex-1">
      <Text className="font-bold text-gray-900 dark:text-white">
        {item.name}
      </Text>
      <Text className="text-xs text-gray-500">{item.team}</Text>
    </View>

    <View className="items-end">
      <Text className="font-bold text-lg text-gray-800 dark:text-gray-200">
        {item.value}
      </Text>
      <Text className="text-[10px] text-gray-400 uppercase">{item.label}</Text>
    </View>
  </View>
);

export default function StatsScreen() {
  const [activeCategory, setActiveCategory] =
    useState<StatCategory>("BAT_RUNS");

  // Determine which data to show
  const getData = () => {
    switch (activeCategory) {
      case "BAT_RUNS":
        return MOST_RUNS;
      case "BAT_SIXES":
        return MOST_SIXES;
      case "BOWL_WICKETS":
        return MOST_WICKETS;
      case "BOWL_ECO":
        return BEST_ECONOMY;
      default:
        return MOST_RUNS;
    }
  };

  const data = getData();
  const topPlayer = data[0];
  const restList = data.slice(1);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4 bg-white dark:bg-gray-900 mb-2 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
          Season 2
        </Text>
        <Text className="text-3xl font-black text-gray-900 dark:text-white italic">
          TOP STATS
        </Text>
      </View>

      {/* Filters */}
      <View className="mb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
        >
          <CategoryButton
            title="Most Runs"
            active={activeCategory === "BAT_RUNS"}
            onPress={() => setActiveCategory("BAT_RUNS")}
          />
          <CategoryButton
            title="Most Wickets"
            active={activeCategory === "BOWL_WICKETS"}
            onPress={() => setActiveCategory("BOWL_WICKETS")}
          />
          <CategoryButton
            title="Most Sixes"
            active={activeCategory === "BAT_SIXES"}
            onPress={() => setActiveCategory("BAT_SIXES")}
          />
          <CategoryButton
            title="Best Economy"
            active={activeCategory === "BOWL_ECO"}
            onPress={() => setActiveCategory("BOWL_ECO")}
          />
        </ScrollView>
      </View>

      {/* Content */}
      <FlatList
        data={restList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
        ListHeaderComponent={() => <TopPlayerCard player={topPlayer} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
