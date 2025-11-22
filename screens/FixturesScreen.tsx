import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  Image,
  StatusBar,
  ImageSourcePropType,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons or use a text char

// --- Import Logos (Adjust path if needed) ---
import Biratnagar_logo from "./components/constants/biratnagar_logo.png";
import Janakpur_logo from "./components/constants/janakpur_logo.png";
import Karnali_logo from "./components/constants/karnali_logo.png";
import Ktm_logo from "./components/constants/ktm_logo.png";
import Lumbini_logo from "./components/constants/lumbini_logo.png";
import Pkr_logo from "./components/constants/pkr_logo.png";
import Rhinos_logo from "./components/constants/rhinos-logo.webp";
import Sudurpachim_logo from "./components/constants/sudurpachim_logo.png";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { useNavigation } from "@react-navigation/native";

// --- Types ---
type MatchStatus = "UPCOMING" | "LIVE" | "FINISHED" | "TODAY";

export type Match = {
  id: string;
  team1: string;
  team2: string;
  time: string;
  title?: string; // For Playoffs
  specialType?: "qualifier" | "eliminator" | "final";
  fullDate: Date; // Used for logic
};

type SectionData = {
  title: string;
  data: Match[];
  isPast?: boolean;
};

// --- Logo & Color Mapping ---
const TEAM_ASSETS: Record<
  string,
  { logo: ImageSourcePropType; color: string }
> = {
  "Janakpur Bolts": { logo: Janakpur_logo, color: "#D81B60" },
  "Kathmandu Gorkhas": { logo: Ktm_logo, color: "#1A237E" },
  "Chitwan Rhinos": { logo: Rhinos_logo, color: "#E65100" },
  "Karnali Yaks": { logo: Karnali_logo, color: "#0277BD" },
  "Biratnagar Kings": { logo: Biratnagar_logo, color: "#283593" },
  "Pokhara Avengers": { logo: Pkr_logo, color: "#C62828" },
  "Sudurpaschim Royals": { logo: Sudurpachim_logo, color: "#F9A825" },
  "Lumbini Lions": { logo: Lumbini_logo, color: "#B71C1C" },
};

const PLACEHOLDER_LOGO = { uri: "https://via.placeholder.com/50" };

// --- Helper: Parse Data ---
// Mock Current Date: Nov 21, 2025
const CURRENT_DATE = new Date("2025-11-21T12:05:04Z");

const getStatus = (matchDate: Date): MatchStatus => {
  const now = CURRENT_DATE;
  // Reset times for pure date comparison
  const d1 = new Date(
    matchDate.getFullYear(),
    matchDate.getMonth(),
    matchDate.getDate()
  );
  const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (d1.getTime() === d2.getTime()) return "TODAY";
  if (d1 < d2) return "FINISHED";
  return "UPCOMING";
};

const d = (month: number, day: number, hour: number = 0) =>
  new Date(2025, month - 1, day, hour);

const RAW_SECTIONS: SectionData[] = [
  {
    title: "Monday, 17 Nov",
    data: [
      {
        id: "1",
        team1: "Janakpur Bolts",
        team2: "Kathmandu Gorkhas",
        time: "04:00 PM",
        fullDate: d(11, 17, 16),
      },
    ],
  },
  {
    title: "Tuesday, 18 Nov",
    data: [
      {
        id: "2",
        team1: "Chitwan Rhinos",
        team2: "Karnali Yaks",
        time: "11:45 AM",
        fullDate: d(11, 18, 11),
      },
      {
        id: "3",
        team1: "Biratnagar Kings",
        team2: "Pokhara Avengers",
        time: "04:00 PM",
        fullDate: d(11, 18, 16),
      },
    ],
  },
  {
    title: "Wednesday, 19 Nov",
    data: [
      {
        id: "4",
        team1: "Kathmandu Gorkhas",
        team2: "Sudurpaschim Royals",
        time: "04:00 PM",
        fullDate: d(11, 19, 16),
      },
    ],
  },
  {
    title: "Thursday, 20 Nov",
    data: [
      {
        id: "5",
        team1: "Lumbini Lions",
        team2: "Chitwan Rhinos",
        time: "04:00 PM",
        fullDate: d(11, 20, 16),
      },
    ],
  },
  {
    title: "Friday, 21 Nov",
    data: [
      {
        id: "6",
        team1: "Pokhara Avengers",
        team2: "Sudurpaschim Royals",
        time: "04:00 PM",
        fullDate: d(11, 21, 16),
      },
    ],
  },
  {
    title: "Saturday, 22 Nov",
    data: [
      {
        id: "7",
        team1: "Karnali Yaks",
        team2: "Lumbini Lions",
        time: "11:15 AM",
        fullDate: d(11, 22, 11),
      },
      {
        id: "8",
        team1: "Kathmandu Gorkhas",
        team2: "Biratnagar Kings",
        time: "03:30 PM",
        fullDate: d(11, 22, 15),
      },
    ],
  },
  {
    title: "Monday, 24 Nov",
    data: [
      {
        id: "9",
        team1: "Janakpur Bolts",
        team2: "Biratnagar Kings",
        time: "11:45 AM",
        fullDate: d(11, 24, 11),
      },
      {
        id: "10",
        team1: "Sudurpaschim Royals",
        team2: "Karnali Yaks",
        time: "04:00 PM",
        fullDate: d(11, 24, 16),
      },
    ],
  },
  {
    title: "Tuesday, 25 Nov",
    data: [
      {
        id: "11",
        team1: "Kathmandu Gorkhas",
        team2: "Lumbini Lions",
        time: "04:00 PM",
        fullDate: d(11, 25, 16),
      },
    ],
  },
  {
    title: "Wednesday, 26 Nov",
    data: [
      {
        id: "12",
        team1: "Biratnagar Kings",
        team2: "Chitwan Rhinos",
        time: "04:00 PM",
        fullDate: d(11, 26, 16),
      },
    ],
  },
  {
    title: "Thursday, 27 Nov",
    data: [
      {
        id: "13",
        team1: "Lumbini Lions",
        team2: "Sudurpaschim Royals",
        time: "11:45 AM",
        fullDate: d(11, 27, 11),
      },
      {
        id: "14",
        team1: "Janakpur Bolts",
        team2: "Pokhara Avengers",
        time: "04:00 PM",
        fullDate: d(11, 27, 16),
      },
    ],
  },
  {
    title: "Friday, 28 Nov",
    data: [
      {
        id: "15",
        team1: "Chitwan Rhinos",
        team2: "Kathmandu Gorkhas",
        time: "11:45 AM",
        fullDate: d(11, 28, 11),
      },
      {
        id: "16",
        team1: "Karnali Yaks",
        team2: "Biratnagar Kings",
        time: "04:00 PM",
        fullDate: d(11, 28, 16),
      },
    ],
  },
  {
    title: "Saturday, 29 Nov",
    data: [
      {
        id: "17",
        team1: "Pokhara Avengers",
        team2: "Lumbini Lions",
        time: "11:15 AM",
        fullDate: d(11, 29, 11),
      },
      {
        id: "18",
        team1: "Sudurpaschim Royals",
        team2: "Janakpur Bolts",
        time: "03:30 PM",
        fullDate: d(11, 29, 15),
      },
    ],
  },
  {
    title: "Sunday, 30 Nov",
    data: [
      {
        id: "19",
        team1: "Karnali Yaks",
        team2: "Kathmandu Gorkhas",
        time: "03:30 PM",
        fullDate: d(11, 30, 15),
      },
    ],
  },
  {
    title: "Tuesday, 02 Dec",
    data: [
      {
        id: "20",
        team1: "Janakpur Bolts",
        team2: "Chitwan Rhinos",
        time: "11:45 AM",
        fullDate: d(12, 2, 11),
      },
      {
        id: "21",
        team1: "Pokhara Avengers",
        team2: "Karnali Yaks",
        time: "04:00 PM",
        fullDate: d(12, 2, 16),
      },
    ],
  },
  {
    title: "Wednesday, 03 Dec",
    data: [
      {
        id: "22",
        team1: "Biratnagar Kings",
        team2: "Lumbini Lions",
        time: "04:00 PM",
        fullDate: d(12, 3, 16),
      },
    ],
  },
  {
    title: "Thursday, 04 Dec",
    data: [
      {
        id: "23",
        team1: "Pokhara Avengers",
        team2: "Kathmandu Gorkhas",
        time: "11:45 AM",
        fullDate: d(12, 4, 11),
      },
      {
        id: "24",
        team1: "Sudurpaschim Royals",
        team2: "Chitwan Rhinos",
        time: "04:00 PM",
        fullDate: d(12, 4, 16),
      },
    ],
  },
  {
    title: "Friday, 05 Dec",
    data: [
      {
        id: "25",
        team1: "Lumbini Lions",
        team2: "Janakpur Bolts",
        time: "04:00 PM",
        fullDate: d(12, 5, 16),
      },
    ],
  },
  {
    title: "Saturday, 06 Dec",
    data: [
      {
        id: "26",
        team1: "Sudurpaschim Royals",
        team2: "Biratnagar Kings",
        time: "11:15 AM",
        fullDate: d(12, 6, 11),
      },
      {
        id: "27",
        team1: "Chitwan Rhinos",
        team2: "Pokhara Avengers",
        time: "03:30 PM",
        fullDate: d(12, 6, 15),
      },
    ],
  },
  {
    title: "Sunday, 07 Dec",
    data: [
      {
        id: "28",
        team1: "Karnali Yaks",
        team2: "Janakpur Bolts",
        time: "03:30 PM",
        fullDate: d(12, 7, 15),
      },
    ],
  },
  {
    title: "Tuesday, 09 Dec",
    data: [
      {
        id: "Q1",
        team1: "1st Place",
        team2: "2nd Place",
        time: "04:00 PM",
        title: "Qualifier 1",
        specialType: "qualifier",
        fullDate: d(12, 9, 16),
      },
    ],
  },
  {
    title: "Wednesday, 10 Dec",
    data: [
      {
        id: "EL",
        team1: "3rd Place",
        team2: "4th Place",
        time: "04:00 PM",
        title: "Eliminator",
        specialType: "eliminator",
        fullDate: d(12, 10, 16),
      },
    ],
  },
  {
    title: "Thursday, 11 Dec",
    data: [
      {
        id: "Q2",
        team1: "Loser Q1",
        team2: "Winner E",
        time: "04:00 PM",
        title: "Qualifier 2",
        specialType: "qualifier",
        fullDate: d(12, 11, 16),
      },
    ],
  },
  {
    title: "Saturday, 13 Dec",
    data: [
      {
        id: "FN",
        team1: "Winner Q1",
        team2: "Winner Q2",
        time: "03:30 PM",
        title: "GRAND FINALE",
        specialType: "final",
        fullDate: d(12, 13, 15),
      },
    ],
  },
];

// Split Data Logic
const PAST_SECTIONS = RAW_SECTIONS.filter((section) => {
  const status = getStatus(section.data[0].fullDate);
  return status === "FINISHED";
}).map((s) => ({ ...s, isPast: true }));

const UPCOMING_SECTIONS = RAW_SECTIONS.filter((section) => {
  const status = getStatus(section.data[0].fullDate);
  return status !== "FINISHED";
});

// --- Components ---

const TeamDisplay = ({
  name,
  align = "left",
}: {
  name: string;
  align?: "left" | "right";
}) => {
  const asset = TEAM_ASSETS[name];
  const logo = asset ? asset.logo : PLACEHOLDER_LOGO;
  const isPlaceholder = !asset;

  return (
    <View
      className={`flex-row items-center ${align === "right" ? "justify-end" : "justify-start"} flex-1`}
    >
      {align === "left" && (
        <Image source={logo} className="w-8 h-8 mr-2" resizeMode="contain" />
      )}
      <Text
        className={`font-bold text-xs w-20 ${align === "right" ? "text-right" : "text-left"} ${isPlaceholder ? "text-gray-500" : "text-gray-900 dark:text-white"}`}
        numberOfLines={2}
      >
        {name}
      </Text>
      {align === "right" && (
        <Image source={logo} className="w-8 h-8 ml-2" resizeMode="contain" />
      )}
    </View>
  );
};

const MatchCard = ({ match }: { match: Match }) => {
  const status = getStatus(match.fullDate);
  const isSpecial = !!match.specialType;

  return (
    <View className="bg-white dark:bg-gray-900 mx-4 mb-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      {isSpecial && (
        <View
          className={`${match.specialType === "final" ? "bg-yellow-500" : "bg-blue-600"} py-1 px-3 items-center`}
        >
          <Text className="text-[10px] font-extrabold text-white uppercase tracking-widest">
            {match.title}
          </Text>
        </View>
      )}
      <View className="flex-row items-center p-4 h-20">
        <TeamDisplay name={match.team1} align="left" />
        <View className="items-center w-24">
          {status === "FINISHED" ? (
            <View className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">
              <Text className="text-gray-600 dark:text-gray-400 font-bold text-xs">
                FT
              </Text>
            </View>
          ) : (
            <View className="items-center">
              {status === "TODAY" && (
                <View className="bg-red-100 dark:bg-red-900 px-2 py-[2px] rounded mb-1">
                  <Text className="text-[8px] text-red-600 dark:text-red-300 font-bold uppercase">
                    Live/Today
                  </Text>
                </View>
              )}
              <Text className="text-gray-900 dark:text-white font-extrabold text-sm">
                {match.time}
              </Text>
              <Text className="text-gray-400 text-[10px] font-medium">
                NPL T20
              </Text>
            </View>
          )}
        </View>
        <TeamDisplay name={match.team2} align="right" />
      </View>
    </View>
  );
};

const SectionHeader = ({
  title,
  isPast,
}: {
  title: string;
  isPast?: boolean;
}) => (
  <View
    className={`px-4 py-3 ${isPast ? "bg-gray-100/90 dark:bg-gray-800/90" : "bg-gray-50/95 dark:bg-black/95"} backdrop-blur-sm`}
  >
    <Text
      className={`font-bold text-xs uppercase tracking-widest ${isPast ? "text-gray-400" : "text-gray-500 dark:text-gray-300"}`}
    >
      {title}
    </Text>
  </View>
);

export default function FixturesScreen() {
  const navigation = useNavigation();
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowHistory(!showHistory);
  };

  // Combine sections dynamically
  const activeSections = showHistory
    ? [...PAST_SECTIONS, ...UPCOMING_SECTIONS]
    : UPCOMING_SECTIONS;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
          Nepal Premier League
        </Text>
        <Text className="text-3xl font-black text-gray-900 dark:text-white italic">
          FIXTURES
        </Text>
      </View>

      <SectionList
        sections={activeSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              (navigation as any).navigate("MatchDetail", { match: item })
            }
          >
            <MatchCard match={item} />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title, isPast } }) => (
          <SectionHeader title={title} isPast={isPast} />
        )}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        // Custom Header Component for the List to Toggle History
        ListHeaderComponent={
          PAST_SECTIONS.length > 0 ? (
            <TouchableOpacity
              onPress={toggleHistory}
              activeOpacity={0.7}
              className="mx-4 my-3 p-3 bg-gray-200 dark:bg-gray-800 rounded-xl flex-row items-center justify-center"
            >
              <Text className="text-gray-600 dark:text-gray-300 font-bold text-sm mr-2">
                {showHistory
                  ? "Hide Completed Matches"
                  : `Show ${PAST_SECTIONS.length} Completed Match Days`}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs">
                {showHistory ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
