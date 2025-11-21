import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function TableScreen() {
  const standings = [
    {
      position: 1,
      team: 'Kathmandu Kings XI',
      played: 8,
      won: 6,
      lost: 2,
      nrr: '+1.45',
      points: 12,
    },
    {
      position: 2,
      team: 'Chitwan Tigers',
      played: 8,
      won: 6,
      lost: 2,
      nrr: '+0.89',
      points: 12,
    },
    {
      position: 3,
      team: 'Pokhara Rhinos',
      played: 8,
      won: 5,
      lost: 3,
      nrr: '+0.56',
      points: 10,
    },
    {
      position: 4,
      team: 'Lalitpur Patriots',
      played: 8,
      won: 5,
      lost: 3,
      nrr: '+0.23',
      points: 10,
    },
    {
      position: 5,
      team: 'Janakpur Bolts',
      played: 8,
      won: 4,
      lost: 4,
      nrr: '-0.12',
      points: 8,
    },
    {
      position: 6,
      team: 'Biratnagar Warriors',
      played: 8,
      won: 3,
      lost: 5,
      nrr: '-0.34',
      points: 6,
    },
    {
      position: 7,
      team: 'Sudurpaschim Royals',
      played: 8,
      won: 2,
      lost: 6,
      nrr: '-0.67',
      points: 4,
    },
    {
      position: 8,
      team: 'Karnali Yaks',
      played: 8,
      won: 1,
      lost: 7,
      nrr: '-1.89',
      points: 2,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-4">
        <Text className="text-white text-3xl font-bold">Points Table</Text>
        <Text className="text-blue-100 mt-1">2025 Season Standings</Text>
      </View>

      {/* Legend */}
      <View className="mx-4 mt-4 bg-white rounded-xl shadow-sm p-4">
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-green-500 rounded-full mr-2" />
            <Text className="text-gray-600 text-xs">Qualified</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
            <Text className="text-gray-600 text-xs">Playoffs</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-gray-300 rounded-full mr-2" />
            <Text className="text-gray-600 text-xs">Eliminated</Text>
          </View>
        </View>
      </View>

      {/* Table Header */}
      <View className="mx-4 mt-4 bg-blue-600 rounded-t-xl">
        <View className="flex-row items-center py-3 px-2">
          <Text className="text-white font-bold text-xs w-10 text-center">#</Text>
          <Text className="text-white font-bold text-xs flex-1">Team</Text>
          <Text className="text-white font-bold text-xs w-10 text-center">P</Text>
          <Text className="text-white font-bold text-xs w-10 text-center">W</Text>
          <Text className="text-white font-bold text-xs w-10 text-center">L</Text>
          <Text className="text-white font-bold text-xs w-16 text-center">NRR</Text>
          <Text className="text-white font-bold text-xs w-12 text-center">Pts</Text>
        </View>
      </View>

      {/* Table Body */}
      <View className="mx-4 bg-white rounded-b-xl shadow-md overflow-hidden mb-6">
        {standings.map((team, index) => (
          <View
            key={team.position}
            className={`flex-row items-center py-4 px-2 ${
              index !== standings.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <View className="w-10 items-center">
              <View
                className={`w-6 h-6 rounded-full items-center justify-center ${
                  team.position <= 2
                    ? 'bg-green-500'
                    : team.position <= 4
                    ? 'bg-orange-500'
                    : 'bg-gray-300'
                }`}
              >
                <Text className="text-white font-bold text-xs">{team.position}</Text>
              </View>
            </View>
            <Text className="text-gray-800 font-semibold text-xs flex-1" numberOfLines={1}>
              {team.team}
            </Text>
            <Text className="text-gray-600 text-xs w-10 text-center">{team.played}</Text>
            <Text className="text-gray-600 text-xs w-10 text-center font-semibold">{team.won}</Text>
            <Text className="text-gray-600 text-xs w-10 text-center">{team.lost}</Text>
            <Text
              className={`text-xs w-16 text-center font-semibold ${
                parseFloat(team.nrr) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {team.nrr}
            </Text>
            <Text className="text-blue-600 font-bold text-sm w-12 text-center">{team.points}</Text>
          </View>
        ))}
      </View>

      {/* Footer Note */}
      <View className="mx-4 mb-6 bg-blue-50 rounded-xl p-4">
        <Text className="text-gray-600 text-xs text-center">
          P: Played | W: Won | L: Lost | NRR: Net Run Rate | Pts: Points
        </Text>
      </View>
    </ScrollView>
  );
}
