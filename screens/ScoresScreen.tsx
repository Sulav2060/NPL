import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function ScoresScreen() {
  const matches = [
    {
      id: 1,
      team1: 'Kathmandu Kings XI',
      team1Score: '185/6',
      team1Overs: '20',
      team2: 'Pokhara Rhinos',
      team2Score: '178/8',
      team2Overs: '20',
      result: 'Kathmandu Kings XI won by 7 runs',
      date: 'Nov 20, 2025',
      status: 'completed',
    },
    {
      id: 2,
      team1: 'Chitwan Tigers',
      team1Score: '145/4',
      team1Overs: '15.3',
      team2: 'Lalitpur Patriots',
      team2Score: '98/2',
      team2Overs: '12.0',
      result: 'In Progress',
      date: 'Nov 21, 2025',
      status: 'live',
    },
    {
      id: 3,
      team1: 'Biratnagar Warriors',
      team1Score: '165/9',
      team1Overs: '20',
      team2: 'Janakpur Bolts',
      team2Score: '166/3',
      team2Overs: '18.2',
      result: 'Janakpur Bolts won by 7 wickets',
      date: 'Nov 19, 2025',
      status: 'completed',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-blue-600 pt-12 pb-6 px-4">
        <Text className="text-white text-3xl font-bold">Match Scores</Text>
        <Text className="text-blue-100 mt-1">Latest Results & Live Scores</Text>
      </View>

      {/* Filter Tabs */}
      <View className="flex-row bg-white mx-4 mt-4 rounded-xl overflow-hidden shadow-sm">
        <TouchableOpacity className="flex-1 bg-blue-600 py-3">
          <Text className="text-white text-center font-semibold">All</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 py-3">
          <Text className="text-gray-600 text-center font-semibold">Live</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 py-3">
          <Text className="text-gray-600 text-center font-semibold">Recent</Text>
        </TouchableOpacity>
      </View>

      {/* Match Cards */}
      <View className="px-4 mt-4 pb-6">
        {matches.map((match) => (
          <View
            key={match.id}
            className={`bg-white rounded-2xl shadow-md mb-4 overflow-hidden ${
              match.status === 'live' ? 'border-2 border-red-500' : ''
            }`}
          >
            {match.status === 'live' && (
              <View className="bg-red-500 px-4 py-2">
                <Text className="text-white font-bold text-center text-xs">🔴 LIVE</Text>
              </View>
            )}
            
            <View className="p-4">
              <Text className="text-gray-500 text-xs mb-3">{match.date}</Text>
              
              {/* Team 1 */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-800 font-semibold text-base flex-1">{match.team1}</Text>
                <Text className="text-gray-800 font-bold text-lg ml-2">
                  {match.team1Score} <Text className="text-sm text-gray-500">({match.team1Overs})</Text>
                </Text>
              </View>

              {/* Team 2 */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-800 font-semibold text-base flex-1">{match.team2}</Text>
                <Text className="text-gray-800 font-bold text-lg ml-2">
                  {match.team2Score} <Text className="text-sm text-gray-500">({match.team2Overs})</Text>
                </Text>
              </View>

              {/* Result */}
              <View className="border-t border-gray-200 pt-3">
                <Text
                  className={`text-center font-semibold text-sm ${
                    match.status === 'live' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {match.result}
                </Text>
              </View>

              <TouchableOpacity className="bg-blue-600 mt-3 py-2.5 rounded-lg">
                <Text className="text-white text-center font-semibold text-sm">View Scorecard</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
