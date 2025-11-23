import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { TableRowData } from "./constants/tableLogic";

// --- Import Logos ---
import Biratnagar_logo from "./constants/biratnagar_logo.png";
import Janakpur_logo from "./constants/janakpur_logo.png";
import Karnali_logo from "./constants/karnali_logo.png";
import Ktm_logo from "./constants/ktm_logo.png";
import Lumbini_logo from "./constants/lumbini_logo.png";
import Pkr_logo from "./constants/pkr_logo.png";
import Rhinos_logo from "./constants/rhinos-logo.webp";
import Sudurpachim_logo from "./constants/sudurpachim_logo.png";

export const TEAM_LOGOS: Record<string, ImageSourcePropType> = {
  "Janakpur Bolts": Janakpur_logo,
  "Kathmandu Gorkhas": Ktm_logo,
  "Chitwan Rhinos": Rhinos_logo,
  "Karnali Yaks": Karnali_logo,
  "Biratnagar Kings": Biratnagar_logo,
  "Pokhara Avengers": Pkr_logo,
  "Sudurpaschim Royals": Sudurpachim_logo,
  "Lumbini Lions": Lumbini_logo,
};

export const TableHeader = () => (
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

export const TableRow = ({
  item,
  index,
  highlightTeams = [],
}: {
  item: TableRowData;
  index: number;
  highlightTeams?: string[];
}) => {
  const isTop4 = index < 4; // Top 4 qualify
  const isHighlighted = highlightTeams.includes(item.name);

  return (
    <View
      className={`flex-row items-center py-3 px-2 border-b border-gray-100 dark:border-gray-800 relative ${
        isHighlighted ? "bg-yellow-50 dark:bg-yellow-900/20" : "bg-white dark:bg-gray-900"
      }`}
    >
      {isTop4 && (
        <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
      )}

      {/* Position */}
      <View className="w-8 items-center">
        <Text className="text-xs font-bold text-gray-500">{index + 1}</Text>
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
                className={`w-[14px] h-[14px] rounded mr-[2px] items-center justify-center ${
                  res === "W"
                    ? "bg-green-500"
                    : res === "L"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
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
          className={`text-[11px] font-bold ${
            item.nrr >= 0 ? "text-green-600" : "text-red-500"
          }`}
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
