import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StatusBar,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NPL_TEAMS } from "../constants/data"; // Adjust path as needed
import { BlurView } from "expo-blur";
// Import logos (Adjust path to match your folder structure)
import Biratnagar_logo from "../constants/biratnagar_logo.png";
import Janakpur_logo from "../constants/janakpur_logo.png";
import Karnali_logo from "../constants/karnali_logo.png";
import Ktm_logo from "../constants/ktm_logo.png";
import Lumbini_logo from "../constants/lumbini_logo.png";
import Pkr_logo from "../constants/pkr_logo.png";
import Rhinos_logo from "../constants/rhinos-logo.webp";
import Sudurpachim_logo from "../constants/sudurpachim_logo.png";
const { width } = Dimensions.get("window");

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
  const { id } = route.params;
  const team = NPL_TEAMS.find((t) => t.id === id);

  // Animation for scrolling
  const scrollY = useRef(new Animated.Value(0)).current;

  if (!team)
    return (
      <View>
        <Text>Team not found</Text>
      </View>
    );

  const localLogo = TEAM_LOGOS[team.id] || { uri: team.logo };

  // Interpolations for smooth UI transitions
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [280, 100],
    extrapolate: "clamp",
  });

  const logoScale = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.4],
    extrapolate: "clamp",
  });

  const logoTranslateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, 110],
    extrapolate: "clamp",
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 w-screen overflow-hidden">
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 120 : StatusBar.currentHeight,
          overflow: "hidden",
          opacity: scrollY.interpolate({
            inputRange: [0, 120],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
          zIndex: 40,
        }}
      >
        <BlurView intensity={50} tint="dark" style={{ flex: 1 }} />
      </Animated.View>
      {/* --- DYNAMIC COLORED BACKGROUND --- */}
      <View
        style={{ backgroundColor: team.color, height: width * 1.2 }}
        className="absolute top-[-100] left-[-100vw]  right-[-100vw] rounded-b-[1000px] "
      />
      {/* --- BACK BUTTON (Fixed) --- */}
      <SafeAreaView
        edges={["top"]}
        className="absolute top-0 left-0 right-0 z-50 px-4"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center mt-2"
        >
          <Text className="text-xl text-white font-bold">←</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Animated.FlatList
        data={team.players}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{
          paddingTop: 280, // Push content down to clear the hero area
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Height animation requires false
        )}
        // --- HERO HEADER (Absolute Positioned Logic handled by scrollY) ---
        ListHeaderComponent={() => null} // We use the animated view below instead
        // --- PLAYER CARD ---
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            className="flex-row items-center bg-white dark:bg-gray-800 p-4 mx-5 mb-4 rounded-3xl shadow-lg shadow-blue-900/20"
            style={{ elevation: 5 }} // Android shadow
            onPress={() =>
              navigation.navigate("Player", { id: item.id, teamId: team.id })
            }
          >
            {/* Player Image with Ring */}
            <View className="relative">
              <View
                style={{ borderColor: team.color }}
                className="w-14 h-14 rounded-full border-2 p-[2px]"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full rounded-full bg-gray-100"
                />
              </View>
              {/* Rank/Number Badge (Mock) */}
              <View className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full w-5 h-5 items-center justify-center border border-white">
                <Text className="text-white text-[8px] font-bold">
                  {index + 1}
                </Text>
              </View>
            </View>

            {/* Info */}
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                {item.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <View className="bg-gray-100 dark:bg-gray-700 px-2 py-[2px] rounded-md">
                  <Text
                    style={{ color: team.color }}
                    className="text-[10px] font-extrabold uppercase"
                  >
                    {item.role}
                  </Text>
                </View>
              </View>
            </View>

            {/* Stats Pill */}
            <View className="items-end">
              <View className="flex-row items-center">
                <Text className="text-gray-400 text-xs mr-1">Mat</Text>
                <Text className="text-base font-bold text-gray-900 dark:text-white">
                  {item.matches}
                </Text>
              </View>
              {/* Chevron */}
              <Text className="text-gray-300 text-xl mt-1">›</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* --- ANIMATED HERO SECTION --- */}
      <Animated.View
        style={{
          height: headerHeight,
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: Platform.OS === "ios" ? 40 : 20,
          zIndex: 50,
        }}
        pointerEvents="none" // Allow clicks to pass through to back button
      >
        <Animated.View
          style={{
            transform: [{ scale: logoScale }, { translateY: logoTranslateY }],
          }}
        >
          <Image
            source={localLogo}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View
          style={{ opacity: textOpacity, alignItems: "center", marginTop: 10 }}
        >
          <Text className="text-3xl font-black text-white text-center px-6 leading-tight shadow-md">
            {team.name}
          </Text>
          <View className="mt-2 bg-white/20 px-4 py-1 rounded-full backdrop-blur-md">
            <Text className="text-white font-bold tracking-widest uppercase text-[10px]">
              {team.location} • SQUAD
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
