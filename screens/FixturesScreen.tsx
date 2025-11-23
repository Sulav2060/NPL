import React, { useState, useMemo } from "react";
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

// --- Import Logos (Adjust path if needed) ---
import Biratnagar_logo from "./components/constants/biratnagar_logo.png";
import Janakpur_logo from "./components/constants/janakpur_logo.png";
import Karnali_logo from "./components/constants/karnali_logo.png";
import Ktm_logo from "./components/constants/ktm_logo.png";
import Lumbini_logo from "./components/constants/lumbini_logo.png";
import Pkr_logo from "./components/constants/pkr_logo.png";
import Rhinos_logo from "./components/constants/rhinos-logo.webp";
import Sudurpachim_logo from "./components/constants/sudurpachim_logo.png";

// --- Import Utilities ---
import {
  getStatus,
  getDiffDays,
  getDayTitle,
  formatTimeFromDate,
  categorizeSectionsByDate,
  RAW_SECTIONS,
  type Match,
  type SectionData,
} from "./components/constants/fixturesUtils";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { useNavigation } from "@react-navigation/native";
import { MATCH_RESULTS } from "./components/constants/tableLogic";

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
  const status = getStatus(match.fullDate, match.endTime);
  const isSpecial = !!match.specialType;

  // Find result if available
  const result = MATCH_RESULTS.find(
    (r) =>
      (r.team1 === match.team1 && r.team2 === match.team2) ||
      (r.team1 === match.team2 && r.team2 === match.team1)
  );

  const winnerTeam =
    result?.winner === "team1"
      ? result.team1
      : result?.winner === "team2"
      ? result.team2
      : null;

  const isToday = getDiffDays(match.fullDate) === 0;

  return (
    <View
      className={`${
        isToday
          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
      } mx-4 mb-3 rounded-2xl shadow-sm border overflow-hidden`}
    >
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
          {(status === "FINISHED" || status === "ENDED") ? (
            <View className="items-center justify-center w-24">
              {winnerTeam ? (
                <View className="items-center">
                  <Text
                    style={{ color: TEAM_ASSETS[winnerTeam]?.color }}
                    className="text-[10px] font-extrabold text-center leading-3"
                  >
                    {winnerTeam}
                  </Text>
                  <Text
                    style={{ color: TEAM_ASSETS[winnerTeam]?.color }}
                    className="text-[9px] font-bold text-center mt-0.5"
                  >
                    WON
                  </Text>
                </View>
              ) : (
                <Text className="text-gray-500 text-[10px] font-bold">Ended</Text>
              )}
            </View>
          ) : (
            <View className="items-center">
              {status === "LIVE" && (
                <View className="bg-red-100 dark:bg-red-900 px-2 py-[2px] rounded mb-1">
                  <Text className="text-[8px] text-red-600 dark:text-red-300 font-bold uppercase">
                    LIVE
                  </Text>
                </View>
              )}
              <Text className="text-gray-900 dark:text-white font-extrabold text-sm">
                {formatTimeFromDate(match.fullDate)}
              </Text>
              <Text className="text-gray-400 text-[10px] font-medium">
                NPL T20
              </Text>
            </View>
          )}
        </View>
        <TeamDisplay name={match.team2} align="right" />
      </View>
      {/* Result Footer */}
      {result && (
        <View className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex-row justify-between items-center border-t border-gray-100 dark:border-gray-700">
          <Text
            className={`text-[10px] font-bold ${
              result.winner === "team1"
                ? "text-green-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {result.t1Score.runs}/{result.t1Score.wickets} ({result.t1Score.overs})
          </Text>
          <Text className="text-[10px] text-gray-400 font-medium">vs</Text>
          <Text
            className={`text-[10px] font-bold ${
              result.winner === "team2"
                ? "text-green-600"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {result.t2Score.runs}/{result.t2Score.wickets} ({result.t2Score.overs})
          </Text>
        </View>
      )}
    </View>
  );
};

const SectionHeader = ({
  title,
  isPast,
  isToday,
}: {
  title: string;
  isPast?: boolean;
  isToday?: boolean;
}) => (
  <View
    className={`px-4 py-3 flex-row items-center justify-between ${
      isToday
        ? "bg-blue-200 dark:bg-blue-800 border-l-4 border-blue-600"
        : isPast
        ? "bg-gray-100/90 dark:bg-gray-800/90"
        : "bg-gray-50/95 dark:bg-black/95"
    } backdrop-blur-sm`}
  >
    <Text
      className={`font-bold text-xs uppercase tracking-widest ${
        isToday
          ? "text-blue-900 dark:text-blue-100"
          : isPast
          ? "text-gray-400"
          : "text-gray-500 dark:text-gray-300"
      }`}
    >
      {title}
    </Text>
  </View>
);

export default function FixturesScreen() {
  const navigation = useNavigation();
  const [showOlder, setShowOlder] = useState(false);
  const [showFuture, setShowFuture] = useState(false);

  // Memoized section categorization to prevent unnecessary recalculations
  const { olderSections, coreSections, futureSections } = useMemo(() => {
    const { older, core, future } = categorizeSectionsByDate(RAW_SECTIONS);

    // Enrich sections with computed title and flags
    const enrichSections = (sections: any[]) => {
      return sections.map((section) => ({
        ...section,
        title: getDayTitle(section.data[0].fullDate),
        isPast: getDiffDays(section.data[0].fullDate) < 0,
        isToday: getDiffDays(section.data[0].fullDate) === 0,
      } as SectionData));
    };

    return {
      olderSections: enrichSections(older),
      coreSections: enrichSections(core),
      futureSections: enrichSections(future),
    };
  }, []);

  const toggleOlder = () => {
    setShowOlder(!showOlder);
  };

  const toggleFuture = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFuture(!showFuture);
  };

  // Dynamically build sections based on visibility toggles
  const buttonSection: SectionData = {
    title: "Controls",
    data: [{ id: "btn-older", team1: "", team2: "", fullDate: new Date(), isButton: true }],
    isButtonSection: true,
  };

  const activeSections = useMemo(
    () => [
      buttonSection,
      ...(showOlder ? olderSections : []),
      ...coreSections,
      ...(showFuture ? futureSections : []),
    ],
    [showOlder, showFuture, olderSections, coreSections, futureSections]
  );

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
        maintainVisibleContentPosition={{
          minIndexForVisible: 1, // Track the item after the button
        }}
        sections={activeSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.isButton) {
            return olderSections.length > 0 ? (
              <TouchableOpacity
                onPress={toggleOlder}
                activeOpacity={0.7}
                className="mx-4 my-3 p-3 bg-gray-200 dark:bg-gray-800 rounded-xl flex-row items-center justify-center"
              >
                <Text className="text-gray-600 dark:text-gray-300 font-bold text-sm mr-2">
                  {showOlder ? "Hide Previous Fixtures" : "Show Previous Fixtures"}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-xs">
                  {showOlder ? "▼" : "▲"}
                </Text>
              </TouchableOpacity>
            ) : null;
          }
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                (navigation as any).navigate("MatchDetail", { match: item })
              }
            >
              <MatchCard match={item} />
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section }) => {
          if (section.isButtonSection) return null;
          return (
            <SectionHeader
              title={section.title}
              isPast={section.isPast}
              isToday={section.isToday}
            />
          );
        }}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          futureSections.length > 0 ? (
            <TouchableOpacity
              onPress={toggleFuture}
              activeOpacity={0.7}
              className="mx-4 my-3 p-3 bg-gray-200 dark:bg-gray-800 rounded-xl flex-row items-center justify-center"
            >
              <Text className="text-gray-600 dark:text-gray-300 font-bold text-sm mr-2">
                {showFuture ? "Hide Upcoming Fixtures" : `Show all Upcoming Fixtures`}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs">
                {showFuture ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
