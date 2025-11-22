import React, { useRef } from "react";
import {
  View,
  Text,
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

  // Header height calculation (Notch aware)
  const HEADER_HEIGHT = Platform.OS === "ios" ? 110 : 80 + insets.top;

  const scrollY = useRef(new Animated.Value(0)).current;

  if (!team)
    return (
      <View>
        <Text>Team not found</Text>
      </View>
    );

  const localLogo = TEAM_LOGOS[team.id] || { uri: team.logo };

  // --- ANIMATION INTERPOLATIONS ---

  // 1. Header Background Opacity (Fades in when scrolling up)
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // 2. Logo Shrink Scale (Starts big, shrinks to navbar size)
  const logoScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.35],
    extrapolate: "clamp",
  });

  // 3. Logo Vertical Movement (Moves up to header)
  const logoTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  // 4. Logo Horizontal Movement (Moves to top-right corner)
  // Adjust '60' to position exactly where you want it in the header
  const logoTranslateX = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, width / 2 - 50],
    extrapolate: "clamp",
  });

  // 5. Text Fade Out (Team name disappears as you scroll)
  const textOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 overflow-hidden">
      <StatusBar barStyle="light-content" />

      {/* --- DYNAMIC BACKGROUND CURVE --- */}
      <View
        style={{ backgroundColor: team.color, height: width * 1.2 }}
        className="absolute top-[-90] left-[-100vw] right-[-100vw] rounded-b-[1000px]"
      />

      {/* --- STICKY HEADER BACKGROUND --- */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          opacity: headerOpacity,
          zIndex: 40,
        }}
      >
        {Platform.OS === "ios" ? (
          // iOS: Real Blur Effect
          <BlurView
            intensity={80}
            tint="dark"
            style={{ flex: 1, backgroundColor: team.color + "33" }}
          />
        ) : (
          // Android: Solid Translucent Color (Blur is often buggy on Android absolute overlays)
          <View
            style={{ flex: 1, backgroundColor: team.color, opacity: 0.95 }}
          />
        )}
      </Animated.View>

      {/* --- FIXED BACK BUTTON --- */}
      <View
        style={{
          top: insets.top + 30,
          left: 16,
          position: "absolute",
          zIndex: 60,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-12 h-12 bg-black/20 rounded-full items-center justify-center"
        >
          <Text className="text-xl text-white font-bold pb-1">←</Text>
        </TouchableOpacity>
      </View>

      {/* --- SCROLLABLE LIST --- */}
      <Animated.FlatList
        data={team.players}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + 200, // Push list down to clear Hero area
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

      {/* --- ANIMATED HERO SECTION (Logo & Title) --- */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT + 220, // Initial Hero Height
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          pointerEvents: "none", // Allow clicks to pass through to the list/buttons
        }}
      >
        {/* Animated Logo Container */}
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

        {/* Animated Text Container (Fades out) */}
        <Animated.View
          style={{ opacity: textOpacity, alignItems: "center", marginTop: 10 }}
        >
          <Text className="text-3xl font-black text-white text-center px-6 shadow-md">
            {team.name}
          </Text>
          <View className="mt-2 bg-white/20 px-4 py-1 rounded-full backdrop-blur-md">
            <Text className="text-white font-bold uppercase text-[10px] tracking-widest">
              {team.location}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
