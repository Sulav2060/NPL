import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  ImageSourcePropType,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Import Logos ---
import Biratnagar_logo from "./components/constants/biratnagar_logo.png";
import Janakpur_logo from "./components/constants/janakpur_logo.png";
import Karnali_logo from "./components/constants/karnali_logo.png";
import Ktm_logo from "./components/constants/ktm_logo.png";
import Lumbini_logo from "./components/constants/lumbini_logo.png";
import Pkr_logo from "./components/constants/pkr_logo.png";
import Rhinos_logo from "./components/constants/rhinos-logo.webp";
import Sudurpachim_logo from "./components/constants/sudurpachim_logo.png";

// ==========================================
// 🛠️ DEVELOPER AREA: ENTER MATCH RESULTS HERE
// ==========================================

type Score = { runs: number; wickets: number; overs: number };
type Result = "team1" | "team2" | "tie" | "nr"; // 'nr' = No Result

type MatchResult = {
  team1: string;
  team2: string;
  t1Score: Score; // Team 1 Batting Stats
  t2Score: Score; // Team 2 Batting Stats
  winner: Result;
};

const MATCH_RESULTS: MatchResult[] = [
  // Match 1: Janakpur vs Kathmandu (Kathmandu Won)
  {
    team1: "Janakpur Bolts",
    team2: "Kathmandu Gorkhas",
    t1Score: { runs: 145, wickets: 8, overs: 20.0 },
    t2Score: { runs: 146, wickets: 4, overs: 18.2 },
    winner: "team2",
  },
  // Match 2: Chitwan vs Karnali (Chitwan Won)
  {
    team1: "Chitwan Rhinos",
    team2: "Karnali Yaks",
    t1Score: { runs: 160, wickets: 6, overs: 20.0 },
    t2Score: { runs: 130, wickets: 10, overs: 19.0 }, // All out count as 20 overs for NRR calc
    winner: "team1",
  },
  // Match 3: Biratnagar vs Pokhara (Biratnagar Won)
  {
    team1: "Biratnagar Kings",
    team2: "Pokhara Avengers",
    t1Score: { runs: 180, wickets: 3, overs: 20.0 },
    t2Score: { runs: 150, wickets: 7, overs: 20.0 },
    winner: "team1",
  },
  // Match 4: Kathmandu vs Sudurpaschim (Kathmandu Won)
  {
    team1: "Kathmandu Gorkhas",
    team2: "Sudurpaschim Royals",
    t1Score: { runs: 170, wickets: 5, overs: 20.0 },
    t2Score: { runs: 120, wickets: 10, overs: 16.4 },
    winner: "team1",
  },
  // Add more matches here as they happen...
];

// ==========================================
// 🧮 LOGIC: AUTO CALCULATION (DO NOT TOUCH)
// ==========================================

const TEAMS_LIST = [
  "Biratnagar Kings",
  "Janakpur Bolts",
  "Karnali Yaks",
  "Kathmandu Gorkhas",
  "Lumbini Lions",
  "Pokhara Avengers",
  "Chitwan Rhinos",
  "Sudurpaschim Royals",
];

const TEAM_LOGOS: Record<string, ImageSourcePropType> = {
  "Janakpur Bolts": Janakpur_logo,
  "Kathmandu Gorkhas": Ktm_logo,
  "Chitwan Rhinos": Rhinos_logo,
  "Karnali Yaks": Karnali_logo,
  "Biratnagar Kings": Biratnagar_logo,
  "Pokhara Avengers": Pkr_logo,
  "Sudurpaschim Royals": Sudurpachim_logo,
  "Lumbini Lions": Lumbini_logo,
};

type TableRowData = {
  name: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  nr: number;
  points: number;
  nrr: number;
  form: string[];
  runsScored: number;
  ballsFaced: number;
  runsConceded: number;
  ballsBowled: number;
};

const calculateTable = () => {
  // Initialize Map
  const stats: Record<string, TableRowData> = {};
  TEAMS_LIST.forEach((team) => {
    stats[team] = {
      name: team,
      played: 0,
      won: 0,
      lost: 0,
      tied: 0,
      nr: 0,
      points: 0,
      nrr: 0,
      form: [],
      runsScored: 0,
      ballsFaced: 0,
      runsConceded: 0,
      ballsBowled: 0,
    };
  });

  // Helper: Convert Overs (e.g., 19.2) to Balls (e.g., 116)
  const oversToBalls = (overs: number) => {
    const whole = Math.floor(overs);
    const part = Math.round((overs - whole) * 10);
    return whole * 6 + part;
  };

  // Process Each Match
  MATCH_RESULTS.forEach((match) => {
    const { team1, team2, t1Score, t2Score, winner } = match;

    // Update Played & Form
    if (stats[team1]) {
      stats[team1].played++;
      stats[team1].form.push(
        winner === "team1" ? "W" : winner === "team2" ? "L" : "D"
      );
    }
    if (stats[team2]) {
      stats[team2].played++;
      stats[team2].form.push(
        winner === "team2" ? "W" : winner === "team1" ? "L" : "D"
      );
    }

    // Update W/L/Pts
    if (winner === "team1") {
      stats[team1].won++;
      stats[team1].points += 2;
      stats[team2].lost++;
    } else if (winner === "team2") {
      stats[team2].won++;
      stats[team2].points += 2;
      stats[team1].lost++;
    } else {
      stats[team1].points += 1;
      stats[team1].tied++; // Simplified Tie/NR logic
      stats[team2].points += 1;
      stats[team2].tied++;
    }

    // Update NRR Stats (Batting Side stats)
    // Note: If a team is all out (10 wickets), overs faced is capped at 20.0 (120 balls)
    const t1Balls = t1Score.wickets === 10 ? 120 : oversToBalls(t1Score.overs);
    const t2Balls = t2Score.wickets === 10 ? 120 : oversToBalls(t2Score.overs);

    stats[team1].runsScored += t1Score.runs;
    stats[team1].ballsFaced += t1Balls;
    stats[team1].runsConceded += t2Score.runs;
    stats[team1].ballsBowled += t2Balls;

    stats[team2].runsScored += t2Score.runs;
    stats[team2].ballsFaced += t2Balls;
    stats[team2].runsConceded += t1Score.runs;
    stats[team2].ballsBowled += t1Balls;
  });

  // Final Calculation & Sort
  return Object.values(stats)
    .map((team) => {
      const battingRR =
        team.ballsFaced > 0 ? (team.runsScored / team.ballsFaced) * 6 : 0;
      const bowlingRR =
        team.ballsBowled > 0 ? (team.runsConceded / team.ballsBowled) * 6 : 0;
      team.nrr = battingRR - bowlingRR;
      // Keep only last 5 form results
      if (team.form.length > 5) team.form = team.form.slice(-5);
      return team;
    })
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points; // Primary Sort: Points
      return b.nrr - a.nrr; // Secondary Sort: NRR
    });
};

// ==========================================
// 🎨 UI COMPONENTS
// ==========================================

const TableHeader = () => (
  <View className="flex-row bg-gray-100 dark:bg-gray-800 py-3 px-2 border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
    <View className="w-8 items-center">
      <Text className="text-[10px] font-bold text-gray-500">Pos</Text>
    </View>
    <View className="flex-1 ml-2">
      <Text className="text-[10px] font-bold text-gray-500 uppercase">
        Team
      </Text>
    </View>
    <View className="w-8 items-center">
      <Text className="text-[10px] font-bold text-gray-500">P</Text>
    </View>
    <View className="w-8 items-center">
      <Text className="text-[10px] font-bold text-gray-500">W</Text>
    </View>
    <View className="w-8 items-center">
      <Text className="text-[10px] font-bold text-gray-500">L</Text>
    </View>
    <View className="w-12 items-center">
      <Text className="text-[10px] font-bold text-gray-500">NRR</Text>
    </View>
    <View className="w-10 items-center">
      <Text className="text-[10px] font-bold text-gray-500">PTS</Text>
    </View>
  </View>
);

const TableRow = ({ item, index }: { item: TableRowData; index: number }) => {
  const isTop4 = index < 4; // Top 4 qualify

  return (
    <View
      className={`flex-row items-center py-3 px-2 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 ${isTop4 ? "bg-blue-50/30 dark:bg-blue-900/10" : ""}`}
    >
      {/* Position */}
      <View className="w-8 items-center">
        <Text
          className={`text-xs font-bold ${isTop4 ? "text-blue-600 dark:text-blue-400" : "text-gray-500"}`}
        >
          {index + 1}
        </Text>
      </View>

      {/* Team Name & Logo */}
      <View className="flex-1 flex-row items-center ml-2">
        <Image
          source={TEAM_LOGOS[item.name]}
          className="w-7 h-7 mr-3"
          resizeMode="contain"
        />
        <View>
          <Text className="text-xs font-bold text-gray-900 dark:text-white mb-[2px]">
            {item.name}
          </Text>
          {/* Form Guide */}
          <View className="flex-row">
            {item.form.map((res, idx) => (
              <View
                key={idx}
                className={`w-[14px] h-[14px] rounded mr-[2px] items-center justify-center ${res === "W" ? "bg-green-500" : res === "L" ? "bg-red-500" : "bg-gray-400"}`}
              >
                <Text className="text-[8px] text-white font-bold">{res}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Stats */}
      <View className="w-8 items-center">
        <Text className="text-xs text-gray-600 dark:text-gray-300 font-medium">
          {item.played}
        </Text>
      </View>
      <View className="w-8 items-center">
        <Text className="text-xs text-gray-600 dark:text-gray-300 font-medium">
          {item.won}
        </Text>
      </View>
      <View className="w-8 items-center">
        <Text className="text-xs text-gray-600 dark:text-gray-300 font-medium">
          {item.lost}
        </Text>
      </View>

      {/* NRR */}
      <View className="w-12 items-center">
        <Text
          className={`text-[11px] font-bold ${item.nrr >= 0 ? "text-green-600" : "text-red-500"}`}
        >
          {item.nrr > 0 ? "+" : ""}
          {item.nrr.toFixed(3)}
        </Text>
      </View>

      {/* Points */}
      <View className="w-10 items-center">
        <View className="bg-gray-100 dark:bg-gray-800 w-8 h-6 rounded items-center justify-center">
          <Text className="text-xs font-extrabold text-gray-900 dark:text-white">
            {item.points}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function TableScreen() {
  // Calculate table data on render
  const tableData = useMemo(() => calculateTable(), []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header Title */}
      <View className="px-6 py-4 bg-white dark:bg-gray-900 mb-3 border-b border-gray-200 dark:border-gray-800">
        <Text className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
          Season 2
        </Text>
        <Text className="text-3xl font-black text-gray-900 dark:text-white italic">
          STANDINGS
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <TableHeader />
          {tableData.map((team, index) => (
            <TableRow key={team.name} item={team} index={index} />
          ))}
        </View>

        {/* Qualification Legend */}
        <View className="flex-row items-center justify-center mt-4 opacity-60">
          <View className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            Qualified for Playoffs (Top 4)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
