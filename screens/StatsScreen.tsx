import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageSourcePropType,
} from "react-native";

// Import team logos
import Biratnagar_logo from "./components/constants/biratnagar_logo.png";
import Janakpur_logo from "./components/constants/janakpur_logo.png";
import Karnali_logo from "./components/constants/karnali_logo.png";
import Ktm_logo from "./components/constants/ktm_logo.png";
import Lumbini_logo from "./components/constants/lumbini_logo.png";
import Pkr_logo from "./components/constants/pkr_logo.png";
import Rhinos_logo from "./components/constants/rhinos-logo.webp";
import Sudurpachim_logo from "./components/constants/sudurpachim_logo.png";

const PLAYER_PLACEHOLDER = "https://via.placeholder.com/150";

// --- Types ---
type ViewType = "PLAYER" | "TEAM";
type StatCategory =
  | "BAT_RUNS"
  | "BAT_SIXES"
  | "BOWL_WICKETS"
  | "BOWL_ECO"
  | "TEAM_TOTAL"
  | "TEAM_EXTRAS"
  | "TEAM_AGGREGATES";

type StatItem = {
  id: string;
  rank: number;
  name: string;
  subText: string;
  value: string | number;
  label: string;
  image: ImageSourcePropType | string; // Changed this type
};

// --- Mock Data ---

const PLAYER_STATS: Record<string, StatItem[]> = {
  BAT_RUNS: [
    {
      id: "1",
      rank: 1,
      name: "Mark Watt",
      subText: "Karnali Yaks",
      value: 130,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "2",
      rank: 2,
      name: "Ravi Bopara",
      subText: "Chitwan Rhinos",
      value: 118,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "3",
      rank: 3,
      name: "Kushal Bhurtel",
      subText: "Pokhara Avengers",
      value: 112,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "4",
      rank: 4,
      name: "PK Panchal",
      subText: "Karnali Yaks",
      value: 102,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "5",
      rank: 5,
      name: "Rohit Paudel",
      subText: "Lumbini Lions",
      value: 88,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "6",
      rank: 6,
      name: "Aarif Sheikh Tripathi",
      subText: "Kathmandu Gurkhas",
      value: 73,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "7",
      rank: 7,
      name: "Lokesh Bam",
      subText: "Biratnagar Kings",
      value: 72,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "8",
      rank: 8,
      name: "Jason Brown",
      subText: "Sudurpashchim Royals",
      value: 68,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "9",
      rank: 9,
      name: "Dan Douthwaite",
      subText: "Pokhara Avengers",
      value: 66,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "10",
      rank: 10,
      name: "Martin Guptill",
      subText: "Biratnagar Kings",
      value: 61,
      label: "Runs",
      image: PLAYER_PLACEHOLDER,
    },
  ],

  BAT_SIXES: [
    {
      id: "1",
      rank: 1,
      name: "Mark Watt",
      subText: "Karnali Yaks",
      value: 12,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "2",
      rank: 2,
      name: "Kushal Bhurtel",
      subText: "Pokhara Avengers",
      value: 8,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "3",
      rank: 3,
      name: "Lokesh Bam",
      subText: "Biratnagar Kings",
      value: 7,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "4",
      rank: 4,
      name: "PK Panchal",
      subText: "Karnali Yaks",
      value: 7,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "5",
      rank: 5,
      name: "Ravi Bopara",
      subText: "Chitwan Rhinos",
      value: 6,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "6",
      rank: 6,
      name: "Dan Douthwaite",
      subText: "Pokhara Avengers",
      value: 6,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "7",
      rank: 7,
      name: "Harmeet Singh",
      subText: "Sudurpashchim Royals",
      value: 6,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "8",
      rank: 8,
      name: "Martin Guptill",
      subText: "Biratnagar Kings",
      value: 5,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "9",
      rank: 9,
      name: "Jason Brown",
      subText: "Sudurpashchim Royals",
      value: 5,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "10",
      rank: 10,
      name: "Jimmy Neesham",
      subText: "Pokhara Avengers",
      value: 5,
      label: "Sixes",
      image: PLAYER_PLACEHOLDER,
    },
  ],
  BOWL_WICKETS: [
    {
      id: "1",
      rank: 1,
      name: "Milind Kumar",
      subText: "Kathmandu Gurkhas",
      value: 5,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "2",
      rank: 2,
      name: "Karan KC",
      subText: "Kathmandu Gurkhas",
      value: 5,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "3",
      rank: 3,
      name: "Harmeet Singh",
      subText: "Sudurpashchim Royals",
      value: 4,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "4",
      rank: 4,
      name: "Ruben Trumpelmann",
      subText: "Lumbini Lions",
      value: 3,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "5",
      rank: 5,
      name: "Scott Kuggeleijn",
      subText: "Sudurpashchim Royals",
      value: 3,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "6",
      rank: 6,
      name: "Sompal Kami",
      subText: "Karnali Yaks",
      value: 3,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "7",
      rank: 7,
      name: "H Dhami",
      subText: "Sudurpashchim Royals",
      value: 3,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "8",
      rank: 8,
      name: "Jimmy Neesham",
      subText: "Pokhara Avengers",
      value: 3,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "9",
      rank: 9,
      name: "Aakash Chand",
      subText: "Pokhara Avengers",
      value: 3,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "10",
      rank: 10,
      name: "Sandeep Lamichhane",
      subText: "Biratnagar Kings",
      value: 2,
      label: "Wickets",
      image: PLAYER_PLACEHOLDER,
    },
  ],

  BOWL_ECO: [
    {
      id: "1",
      rank: 1,
      name: "Sandeep Lamichhane",
      subText: "Biratnagar Kings",
      value: "4.50",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "2",
      rank: 2,
      name: "Shahab Alam",
      subText: "Kathmandu Gurkhas",
      value: "4.71",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "3",
      rank: 3,
      name: "Harmeet Singh",
      subText: "Sudurpashchim Royals",
      value: "5.37",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "4",
      rank: 4,
      name: "Saqib Zaib",
      subText: "Chitwan Rhinos",
      value: "5.85",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "5",
      rank: 5,
      name: "Ruben Trumpelmann",
      subText: "Lumbini Lions",
      value: "6.00",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "6",
      rank: 6,
      name: "Kushal Malla",
      subText: "Chitwan Rhinos",
      value: "6.42",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "7",
      rank: 7,
      name: "Lalit Rajbanshi",
      subText: "Janakpur Bolts",
      value: "6.50",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "8",
      rank: 8,
      name: "Akash Sah",
      subText: "Janakpur Bolts",
      value: "6.50",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "9",
      rank: 9,
      name: "Santosh Yadav",
      subText: "Kathmandu Gurkhas",
      value: "6.50",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
    {
      id: "10",
      rank: 10,
      name: "Sunny Patel",
      subText: "Kathmandu Gurkhas",
      value: "6.75",
      label: "Economy",
      image: PLAYER_PLACEHOLDER,
    },
  ],
};

const TEAM_STATS: Record<string, StatItem[]> = {
  TEAM_TOTAL: [
    {
      id: "1",
      rank: 1,
      name: "Biratnagar Kings",
      subText: "vs Pokhara • 18 Nov 2025",
      value: "220/6",
      label: "Score",
      image: Biratnagar_logo,
    },
    {
      id: "2",
      rank: 2,
      name: "Sudurpashchim Royals",
      subText: "vs Pokhara • 21 Nov 2025",
      value: "193/7",
      label: "Score",
      image: Sudurpachim_logo,
    },
    {
      id: "3",
      rank: 3,
      name: "Pokhara Avengers",
      subText: "vs Sudurpashchim • 21 Nov 2025",
      value: "175/8",
      label: "Score",
      image: Pkr_logo,
    },
    {
      id: "4",
      rank: 4,
      name: "Chitwan Rhinos",
      subText: "vs Karnali • 18 Nov 2025",
      value: "171/6",
      label: "Score",
      image: Rhinos_logo,
    },
    {
      id: "5",
      rank: 5,
      name: "Pokhara Avengers",
      subText: "vs Biratnagar • 18 Nov 2025",
      value: "167",
      label: "Score",
      image: Pkr_logo,
    },
    {
      id: "6",
      rank: 6,
      name: "Karnali Yaks",
      subText: "vs Chitwan • 18 Nov 2025",
      value: "166/3",
      label: "Score",
      image: Karnali_logo,
    },
    {
      id: "7",
      rank: 7,
      name: "Karnali Yaks",
      subText: "vs Lumbini • 22 Nov 2025",
      value: "161/1",
      label: "Score",
      image: Karnali_logo,
    },
    {
      id: "8",
      rank: 8,
      name: "Lumbini Lions",
      subText: "vs Karnali • 22 Nov 2025",
      value: "156/8",
      label: "Score",
      image: Lumbini_logo,
    },
    {
      id: "9",
      rank: 9,
      name: "Sudurpashchim Royals",
      subText: "vs Kathmandu • 19 Nov 2025",
      value: "147",
      label: "Score",
      image: Sudurpachim_logo,
    },
    {
      id: "10",
      rank: 10,
      name: "Lumbini Lions",
      subText: "vs Chitwan • 20 Nov 2025",
      value: "146/4",
      label: "Score",
      image: Lumbini_logo,
    },
  ],

  TEAM_EXTRAS: [
    {
      id: "1",
      rank: 1,
      name: "Sudur Paschim Royals",
      subText: "Total Extras",
      value: 20,
      label: "Extras",
      image: Sudurpachim_logo,
    },
    {
      id: "2",
      rank: 1,
      name: "Lumbini Lions",
      subText: "Total Extras",
      value: 20,
      label: "Extras",
      image: Lumbini_logo,
    },
    {
      id: "3",
      rank: 3,
      name: "Karnali Yaks",
      subText: "Total Extras",
      value: 15,
      label: "Extras",
      image: Karnali_logo,
    },
    {
      id: "4",
      rank: 4,
      name: "Kathmandu Gorkhas",
      subText: "Total Extras",
      value: 13,
      label: "Extras",
      image: Ktm_logo,
    },
    {
      id: "5",
      rank: 5,
      name: "Pokhara Avengers",
      subText: "Total Extras",
      value: 10,
      label: "Extras",
      image: Pkr_logo,
    },
    {
      id: "6",
      rank: 6,
      name: "Janakpur Bolts",
      subText: "Total Extras",
      value: 5,
      label: "Extras",
      image: Janakpur_logo,
    },
    {
      id: "7",
      rank: 7,
      name: "Biratnagar Kings",
      subText: "Total Extras",
      value: 5,
      label: "Extras",
      image: Biratnagar_logo,
    },
    {
      id: "8",
      rank: 8,
      name: "Chitwan Rhinos",
      subText: "Total Extras",
      value: 6,
      label: "Extras",
      image: Rhinos_logo,
    },
  ],
  TEAM_AGGREGATES: [
    {
      id: "1",
      rank: 1,
      name: "Biratnagar Kings vs Pokhara Avengers",
      subText: "Total Match Aggregate • 387 runs • 18 Nov 2025",
      value: 387,
      label: "Runs",
      image: Biratnagar_logo,
    },
    {
      id: "2",
      rank: 2,
      name: "Pokhara Avengers vs Sudur Paschim Royals",
      subText: "Total Match Aggregate • 368 runs • 21 Nov 2025",
      value: 368,
      label: "Runs",
      image: Pkr_logo,
    },
    {
      id: "3",
      rank: 3,
      name: "Chitwan Rhinos vs Karnali Yaks",
      subText: "Total Match Aggregate • 337 runs • 18 Nov 2025",
      value: 337,
      label: "Runs",
      image: Rhinos_logo,
    },
    {
      id: "4",
      rank: 4,
      name: "Karnali Yaks vs Lumbini Lions",
      subText: "Total Match Aggregate • 317 runs • 22 Nov 2025",
      value: 317,
      label: "Runs",
      image: Karnali_logo,
    },
    {
      id: "5",
      rank: 5,
      name: "Chitwan Rhinos vs Lumbini Lions",
      subText: "Total Match Aggregate • 288 runs • 20 Nov 2025",
      value: 288,
      label: "Runs",
      image: Rhinos_logo,
    },
    {
      id: "6",
      rank: 6,
      name: "Kathmandu Gorkhas vs Sudur Paschim Royals",
      subText: "Total Match Aggregate • 265 runs • 19 Nov 2025",
      value: 265,
      label: "Runs",
      image: Ktm_logo,
    },
    {
      id: "7",
      rank: 7,
      name: "Janakpur Bolts vs Kathmandu Gorkhas",
      subText: "Total Match Aggregate • 261 runs • 17 Nov 2025",
      value: 261,
      label: "Runs",
      image: Janakpur_logo,
    },
  ],
};

// --- Components ---

const TabSwitch = ({
  active,
  onChange,
}: {
  active: ViewType;
  onChange: (t: ViewType) => void;
}) => (
  <View
    style={{
      flexDirection: "row",
      backgroundColor: "#f3f4f6",
      padding: 4,
      borderRadius: 9999,
      marginHorizontal: 24,
      marginBottom: 16,
    }}
  >
    <TouchableOpacity
      onPress={() => onChange("PLAYER")}
      style={{
        flex: 1,
        paddingVertical: 8,
        borderRadius: 9999,
        alignItems: "center",
        backgroundColor: active === "PLAYER" ? "#ffffff" : "transparent",
        shadowColor: active === "PLAYER" ? "#000" : "transparent",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: active === "PLAYER" ? 2 : 0,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "800",
          textTransform: "uppercase",
          letterSpacing: 1,
          color: active === "PLAYER" ? "#2563eb" : "#9ca3af",
        }}
      >
        Players
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onChange("TEAM")}
      style={{
        flex: 1,
        paddingVertical: 8,
        borderRadius: 9999,
        alignItems: "center",
        backgroundColor: active === "TEAM" ? "#ffffff" : "transparent",
        shadowColor: active === "TEAM" ? "#000" : "transparent",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: active === "TEAM" ? 2 : 0,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "800",
          textTransform: "uppercase",
          letterSpacing: 1,
          color: active === "TEAM" ? "#2563eb" : "#9ca3af",
        }}
      >
        Teams
      </Text>
    </TouchableOpacity>
  </View>
);

const Chip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 9999,
      marginRight: 8,
      borderWidth: 1,
      backgroundColor: active ? "#2563eb" : "#ffffff",
      borderColor: active ? "#2563eb" : "#e5e7eb",
    }}
  >
    <Text
      style={{
        fontSize: 12,
        fontWeight: "700",
        color: active ? "#ffffff" : "#4b5563",
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const TopCard = ({ item, type }: { item: StatItem; type: ViewType }) => {
  // Handle both string URLs and imported images
  const imgSource =
    typeof item.image === "string" ? { uri: item.image } : item.image;

  return (
    <View style={{ marginHorizontal: 16, marginTop: 8, marginBottom: 24 }}>
      <View
        style={{
          backgroundColor: "#2563eb",
          borderRadius: 24,
          padding: 20,
          position: "relative",
          overflow: "hidden",
          shadowColor: "#2563eb",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        {/* Background decoration */}
        <View
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 128,
            height: 128,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 9999,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 4 }}>👑</Text>
              <Text
                style={{
                  color: "#dbeafe",
                  fontWeight: "700",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Leader
              </Text>
            </View>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 22,
                fontWeight: "900",
                lineHeight: 28,
                marginBottom: 4,
              }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: "#bfdbfe",
                fontSize: 12,
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {item.subText}
            </Text>
          </View>

          {/* Stats Box */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 8,
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 28, fontWeight: "900" }}>
              {item.value}
            </Text>
            <Text
              style={{
                color: "#dbeafe",
                fontSize: 10,
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </Text>
          </View>
        </View>

        {/* Large faded number 1 */}
        <Text
          style={{
            position: "absolute",
            bottom: -32,
            left: -16,
            fontSize: 120,
            fontWeight: "900",
            color: "rgba(255,255,255,0.05)",
            zIndex: 0,
          }}
        >
          1
        </Text>
      </View>
    </View>
  );
};

const RankRow = ({ item, type }: { item: StatItem; type: ViewType }) => {
  const isTeam = type === "TEAM";
  // Handle both string URLs and imported images
  const imgSource =
    typeof item.image === "string" ? { uri: item.image } : item.image;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
      }}
    >
      <Text
        style={{ color: "#9ca3af", fontWeight: "700", fontSize: 18, width: 32 }}
      >
        {item.rank}
      </Text>

      <Image
        source={imgSource}
        style={{
          width: isTeam ? 40 : 48,
          height: isTeam ? 40 : 48,
          borderRadius: 9999,
          backgroundColor: "#f3f4f6",
          marginRight: 16,
        }}
        resizeMode={isTeam ? "contain" : "cover"}
      />

      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={{ color: "#111827", fontWeight: "700", fontSize: 16 }}>
          {item.name}
        </Text>
        <Text style={{ color: "#6b7280", fontSize: 12 }}>{item.subText}</Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ color: "#111827", fontWeight: "900", fontSize: 18 }}>
          {item.value}
        </Text>
        <Text
          style={{
            color: "#9ca3af",
            fontSize: 10,
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          {item.label}
        </Text>
      </View>
    </View>
  );
};

export default function StatsScreen() {
  const [viewType, setViewType] = useState<ViewType>("PLAYER");
  const [activeCategory, setActiveCategory] =
    useState<StatCategory>("BAT_RUNS");

  const handleTypeChange = (type: ViewType) => {
    setViewType(type);
    setActiveCategory(type === "PLAYER" ? "BAT_RUNS" : "TEAM_TOTAL");
  };

  const data =
    (viewType === "PLAYER"
      ? PLAYER_STATS[activeCategory]
      : TEAM_STATS[activeCategory]) || [];
  const topItem = data[0];
  const restList = data.slice(1);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Header */}
      <View
        style={{ paddingHorizontal: 24, paddingTop: 60, paddingBottom: 16 }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "900",
            color: "#111827",
            fontStyle: "italic",
          }}
        >
          STATS CENTER
        </Text>
      </View>

      {/* Toggle */}
      <TabSwitch active={viewType} onChange={handleTypeChange} />

      {/* Horizontal Filters */}
      <View style={{ height: 32, marginBottom: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {viewType === "PLAYER" ? (
            <>
              <Chip
                label="Most Runs"
                active={activeCategory === "BAT_RUNS"}
                onPress={() => setActiveCategory("BAT_RUNS")}
              />
              <Chip
                label="Most Wickets"
                active={activeCategory === "BOWL_WICKETS"}
                onPress={() => setActiveCategory("BOWL_WICKETS")}
              />
              <Chip
                label="Most Extras"
                active={activeCategory === "TEAM_EXTRAS"}
                onPress={() => setActiveCategory("TEAM_EXTRAS")}
              />
              <Chip
                label="Best Economy"
                active={activeCategory === "BOWL_ECO"}
                onPress={() => setActiveCategory("BOWL_ECO")}
              />
            </>
          ) : (
            <>
              <Chip
                label="Highest Total"
                active={activeCategory === "TEAM_TOTAL"}
                onPress={() => setActiveCategory("TEAM_TOTAL")}
              />
              <Chip
                label="Most Sixes"
                active={activeCategory === "TEAM_EXTRAS"}
                onPress={() => setActiveCategory("TEAM_EXTRAS")}
              />
              <Chip
                label="Highest Aggregrates"
                active={activeCategory === "TEAM_AGGREGATES"}
                onPress={() => setActiveCategory("TEAM_AGGREGATES")}
              />
            </>
          )}
        </ScrollView>
      </View>

      {/* List Content */}
      <FlatList
        data={restList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() =>
          topItem ? <TopCard item={topItem} type={viewType} /> : null
        }
        renderItem={({ item }) => <RankRow item={item} type={viewType} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
