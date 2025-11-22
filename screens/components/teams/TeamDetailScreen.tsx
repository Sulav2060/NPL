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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = Platform.OS === "ios" ? 110 : 80 + insets.top;

  const scrollY = useRef(new Animated.Value(0)).current;

  if (!team)
    return (
      <View>
        <Text>Team not found</Text>
      </View>
    );

  const localLogo = TEAM_LOGOS[team.id] || { uri: team.logo };

  // 1. Header Background Opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // 2. Logo Shrink & Move
  const logoScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.35], // Shrink to 35% size
    extrapolate: "clamp",
  });

  const logoTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -40], // Move UP towards header
    extrapolate: "clamp",
  });

  const logoTranslateX = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, width / 2 - 60], // Move RIGHT towards corner
    extrapolate: "clamp",
  });

  // 3. Text Fade Out
  const textOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 bg-gray-300 dark:bg-gray-900 overflow-hidden">
      <StatusBar barStyle="light-content" />

      {/* --- DYNAMIC BACKGROUND --- */}
      <View
        style={{ backgroundColor: team.color, height: width * 1.2 }}
        className="absolute top-[-90] left-[-100vw]  right-[-100vw] rounded-b-[1000px] "
      />

      {/* --- STICKY HEADER BACKGROUND (Blur/Solid) --- */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          opacity: headerOpacity,
          zIndex: 40,
          // Android Fix: Fallback to solid dark color because Blur doesn't overlay well
          backgroundColor:
            Platform.OS === "android" ? "rgba(20,20,20,0.95)" : "transparent",
        }}
      >
        {/* iOS Glass Effect */}
        {Platform.OS === "ios" && (
          <BlurView intensity={80} tint="dark" style={{ flex: 1 }} />
        )}
      </Animated.View>

      {/* --- FIXED BACK BUTTON --- */}
      <View
        style={{
          top: insets.top + 10,
          left: 16,
          position: "absolute",
          zIndex: 60,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full items-center justify-center"
        >
          <Text className="text-xl text-white font-bold pb-1">←</Text>
        </TouchableOpacity>
      </View>

      {/* --- SCROLLABLE LIST --- */}
      <Animated.FlatList
        data={team.players}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + 180, // Clear the Hero area
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            className="flex-row items-center bg-white dark:bg-gray-800 p-4 mx-5 mb-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
            onPress={() =>
              navigation.navigate("Player", { id: item.id, teamId: team.id })
            }
          >
            <View className="relative mr-4">
              <Image
                source={{ uri: item.image }}
                className="w-14 h-14 rounded-full bg-gray-100"
              />
              <View className="absolute -bottom-1 -right-1 bg-gray-900 w-5 h-5 rounded-full items-center justify-center border border-white">
                <Text className="text-white text-[8px] font-bold">
                  {index + 1}
                </Text>
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900 dark:text-white">
                {item.name}
              </Text>
              <Text
                style={{ color: team.color }}
                className="text-xs font-extrabold uppercase mt-1"
              >
                {item.role}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-gray-400 text-[10px] uppercase font-bold">
                Matches
              </Text>
              <Text className="text-base font-bold text-gray-900 dark:text-white">
                {item.matches}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* --- HERO / HEADER LOGO ANIMATION --- */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT + 200, // Height of hero area
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          pointerEvents: "none", // Let clicks pass through to list
        }}
      >
        {/* Logo Container */}
        <Animated.View
          style={{
            transform: [
              { translateY: logoTranslateY },
              { translateX: logoTranslateX },
              { scale: logoScale },
            ],
          }}
        >
          <Image
            source={localLogo}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </Animated.View>

        {/* Text Container (Fades out) */}
        <Animated.View
          style={{ opacity: textOpacity, alignItems: "center", marginTop: 10 }}
        >
          <Text className="text-3xl font-black text-white text-center px-6 shadow-md">
            {team.name}
          </Text>
          <View className="mt-2 bg-white/20 px-4 py-1 rounded-full">
            <Text className="text-white font-bold uppercase text-[10px] tracking-widest">
              {team.location}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
