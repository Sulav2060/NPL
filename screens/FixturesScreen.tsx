import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function FixturesScreen() {
  const fixtures = [
    {
      id: 1,
      team1: 'Kathmandu Kings XI',
      team2: 'Pokhara Rhinos',
      date: 'Nov 25, 2025',
      time: '2:00 PM',
      venue: 'TU Cricket Ground',
      matchNumber: 'Match 15',
    },
    {
      id: 2,
      team1: 'Chitwan Tigers',
      team2: 'Biratnagar Warriors',
      date: 'Nov 26, 2025',
      time: '2:00 PM',
      venue: 'Mulpani Cricket Ground',
      matchNumber: 'Match 16',
    },
    {
      id: 3,
      team1: 'Lalitpur Patriots',
      team2: 'Janakpur Bolts',
      date: 'Nov 27, 2025',
      time: '6:00 PM',
      venue: 'TU Cricket Ground',
      matchNumber: 'Match 17',
    },
    {
      id: 4,
      team1: 'Sudurpaschim Royals',
      team2: 'Karnali Yaks',
      date: 'Nov 28, 2025',
      time: '2:00 PM',
      venue: 'Mulpani Cricket Ground',
      matchNumber: 'Match 18',
    },
    {
      id: 5,
      team1: 'Pokhara Rhinos',
      team2: 'Chitwan Tigers',
      date: 'Nov 29, 2025',
      time: '6:00 PM',
      venue: 'TU Cricket Ground',
      matchNumber: 'Match 19',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-4">
        <Text className="text-white text-3xl font-bold">Fixtures</Text>
        <Text className="text-blue-100 mt-1">Upcoming Matches</Text>
      </View>

      {/* Fixtures List */}
      <View className="px-4 mt-4 pb-6">
        {fixtures.map((fixture) => (
          <View key={fixture.id} className="bg-white rounded-2xl shadow-md mb-4 p-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-blue-600 font-semibold text-xs">{fixture.matchNumber}</Text>
              <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-600 font-semibold text-xs">UPCOMING</Text>
              </View>
            </View>

            <View className="items-center mb-4">
              <Text className="text-gray-800 font-semibold text-base text-center mb-2">
                {fixture.team1}
              </Text>
              <View className="bg-gray-100 px-4 py-2 rounded-full my-2">
                <Text className="text-gray-600 font-bold text-sm">VS</Text>
              </View>
              <Text className="text-gray-800 font-semibold text-base text-center mt-2">
                {fixture.team2}
              </Text>
            </View>

            <View className="border-t border-gray-200 pt-4 space-y-2">
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-sm">📅 {fixture.date}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-sm">🕐 {fixture.time}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-600 text-sm">📍 {fixture.venue}</Text>
              </View>
            </View>

            <TouchableOpacity className="bg-blue-600 mt-4 py-2.5 rounded-lg">
              <Text className="text-white text-center font-semibold text-sm">Set Reminder</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
