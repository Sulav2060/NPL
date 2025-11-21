import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function StatsScreen() {
  const [selectedTab, setSelectedTab] = useState('batting');

  const battingStats = [
    {
      rank: 1,
      name: 'Kushal Bhurtel',
      team: 'Kathmandu Kings XI',
      matches: 8,
      runs: 456,
      avg: '65.14',
      sr: '145.23',
      hs: '94*',
    },
    {
      rank: 2,
      name: 'Rohit Paudel',
      team: 'Pokhara Rhinos',
      matches: 8,
      runs: 398,
      avg: '56.86',
      sr: '138.19',
      hs: '87',
    },
    {
      rank: 3,
      name: 'Kushal Malla',
      team: 'Lalitpur Patriots',
      matches: 8,
      runs: 376,
      avg: '53.71',
      sr: '142.05',
      hs: '78',
    },
    {
      rank: 4,
      name: 'Aasif Sheikh',
      team: 'Chitwan Tigers',
      matches: 8,
      runs: 365,
      avg: '52.14',
      sr: '135.44',
      hs: '102',
    },
  ];

  const bowlingStats = [
    {
      rank: 1,
      name: 'Sandeep Lamichhane',
      team: 'Kathmandu Kings XI',
      matches: 8,
      wickets: 18,
      avg: '15.22',
      econ: '6.45',
      best: '4/21',
    },
    {
      rank: 2,
      name: 'Karan KC',
      team: 'Pokhara Rhinos',
      matches: 8,
      wickets: 15,
      avg: '18.40',
      econ: '7.12',
      best: '3/19',
    },
    {
      rank: 3,
      name: 'Sompal Kami',
      team: 'Biratnagar Warriors',
      matches: 8,
      wickets: 14,
      avg: '19.57',
      econ: '7.34',
      best: '4/25',
    },
    {
      rank: 4,
      name: 'Lalit Rajbanshi',
      team: 'Janakpur Bolts',
      matches: 8,
      wickets: 13,
      avg: '20.15',
      econ: '6.89',
      best: '3/16',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-4">
        <Text className="text-white text-3xl font-bold">Player Stats</Text>
        <Text className="text-blue-100 mt-1">Top Performers 2025</Text>
      </View>

      {/* Tab Selector */}
      <View className="flex-row bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
        <TouchableOpacity
          className={`flex-1 py-3 ${selectedTab === 'batting' ? 'bg-blue-600' : ''}`}
          onPress={() => setSelectedTab('batting')}
        >
          <Text
            className={`text-center font-semibold ${
              selectedTab === 'batting' ? 'text-white' : 'text-gray-600'
            }`}
          >
            🏏 Batting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 ${selectedTab === 'bowling' ? 'bg-blue-600' : ''}`}
          onPress={() => setSelectedTab('bowling')}
        >
          <Text
            className={`text-center font-semibold ${
              selectedTab === 'bowling' ? 'text-white' : 'text-gray-600'
            }`}
          >
            ⚾ Bowling
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      {selectedTab === 'batting' ? (
        <View className="px-4 mt-4 pb-6">
          {battingStats.map((player) => (
            <View key={player.rank} className="bg-white rounded-2xl shadow-md mb-4 p-5">
              <View className="flex-row items-center mb-4">
                <View className="bg-blue-600 w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">#{player.rank}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-bold text-base">{player.name}</Text>
                  <Text className="text-gray-500 text-xs mt-1">{player.team}</Text>
                </View>
              </View>

              <View className="border-t border-gray-200 pt-4">
                <View className="flex-row flex-wrap">
                  <View className="w-1/3 mb-3">
                    <Text className="text-gray-500 text-xs mb-1">Matches</Text>
                    <Text className="text-gray-800 font-semibold">{player.matches}</Text>
                  </View>
                  <View className="w-1/3 mb-3">
                    <Text className="text-gray-500 text-xs mb-1">Runs</Text>
                    <Text className="text-gray-800 font-semibold">{player.runs}</Text>
                  </View>
                  <View className="w-1/3 mb-3">
                    <Text className="text-gray-500 text-xs mb-1">Average</Text>
                    <Text className="text-gray-800 font-semibold">{player.avg}</Text>
                  </View>
                  <View className="w-1/3">
                    <Text className="text-gray-500 text-xs mb-1">Strike Rate</Text>
                    <Text className="text-gray-800 font-semibold">{player.sr}</Text>
                  </View>
                  <View className="w-1/3">
                    <Text className="text-gray-500 text-xs mb-1">Highest Score</Text>
                    <Text className="text-gray-800 font-semibold">{player.hs}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="px-4 mt-4 pb-6">
          {bowlingStats.map((player) => (
            <View key={player.rank} className="bg-white rounded-2xl shadow-md mb-4 p-5">
              <View className="flex-row items-center mb-4">
                <View className="bg-blue-600 w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">#{player.rank}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-bold text-base">{player.name}</Text>
                  <Text className="text-gray-500 text-xs mt-1">{player.team}</Text>
                </View>
              </View>

              <View className="border-t border-gray-200 pt-4">
                <View className="flex-row flex-wrap">
                  <View className="w-1/3 mb-3">
                    <Text className="text-gray-500 text-xs mb-1">Matches</Text>
                    <Text className="text-gray-800 font-semibold">{player.matches}</Text>
                  </View>
                  <View className="w-1/3 mb-3">
                    <Text className="text-gray-500 text-xs mb-1">Wickets</Text>
                    <Text className="text-gray-800 font-semibold">{player.wickets}</Text>
                  </View>
                  <View className="w-1/3 mb-3">
                    <Text className="text-gray-500 text-xs mb-1">Average</Text>
                    <Text className="text-gray-800 font-semibold">{player.avg}</Text>
                  </View>
                  <View className="w-1/3">
                    <Text className="text-gray-500 text-xs mb-1">Economy</Text>
                    <Text className="text-gray-800 font-semibold">{player.econ}</Text>
                  </View>
                  <View className="w-1/3">
                    <Text className="text-gray-500 text-xs mb-1">Best Figures</Text>
                    <Text className="text-gray-800 font-semibold">{player.best}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
