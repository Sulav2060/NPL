import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const upcomingMatch = {
    team1: 'Kathmandu Kings XI',
    team2: 'Pokhara Rhinos',
    date: 'Nov 25, 2025',
    time: '2:00 PM',
    venue: 'TU Cricket Ground',
  };

  const liveMatch = {
    team1: 'Chitwan Tigers',
    team1Score: '145/4',
    team1Overs: '15.3',
    team2: 'Lalitpur Patriots',
    team2Score: '98/2',
    team2Overs: '12.0',
    status: 'LIVE',
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-gradient-to-r from-blue-600 to-blue-800 pt-12 pb-8 px-4">
        <Text className="text-white text-4xl font-bold text-center">🏏 NPL 2025</Text>
        <Text className="text-blue-100 text-center mt-2">Nepal Premier League</Text>
      </View>

      {/* Live Match Card */}
      <View className="mx-4 mt-4 bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-red-500">
        <View className="bg-red-500 px-4 py-2">
          <Text className="text-white font-bold text-center">🔴 LIVE MATCH</Text>
        </View>
        <View className="p-4">
          <View className="mb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-800 font-semibold text-base flex-1">{liveMatch.team1}</Text>
              <Text className="text-gray-800 font-bold text-lg">{liveMatch.team1Score}</Text>
            </View>
            <Text className="text-gray-500 text-xs ml-2">({liveMatch.team1Overs} overs)</Text>
          </View>
          
          <View className="border-t border-gray-200 pt-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-800 font-semibold text-base flex-1">{liveMatch.team2}</Text>
              <Text className="text-gray-800 font-bold text-lg">{liveMatch.team2Score}</Text>
            </View>
            <Text className="text-gray-500 text-xs ml-2">({liveMatch.team2Overs} overs)</Text>
          </View>

          <TouchableOpacity className="bg-red-500 mt-4 py-3 rounded-lg">
            <Text className="text-white text-center font-semibold">View Live Score</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Next Match Card */}
      <View className="mx-4 mt-4 bg-white rounded-2xl shadow-md p-5">
        <Text className="text-gray-800 font-bold text-lg mb-4">⏰ Next Match</Text>
        <View className="items-center mb-4">
          <Text className="text-gray-800 font-semibold text-base text-center mb-2">{upcomingMatch.team1}</Text>
          <Text className="text-gray-400 text-sm my-2">VS</Text>
          <Text className="text-gray-800 font-semibold text-base text-center">{upcomingMatch.team2}</Text>
        </View>
        <View className="border-t border-gray-200 pt-4 space-y-2">
          <Text className="text-gray-600 text-sm">📅 {upcomingMatch.date}</Text>
          <Text className="text-gray-600 text-sm">🕐 {upcomingMatch.time}</Text>
          <Text className="text-gray-600 text-sm">📍 {upcomingMatch.venue}</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View className="mx-4 mt-4 mb-6">
        <Text className="text-gray-800 font-bold text-lg mb-3">📊 Tournament Stats</Text>
        <View className="flex-row justify-between">
          <View className="bg-white rounded-xl shadow-md p-4 flex-1 mr-2 items-center">
            <Text className="text-2xl font-bold text-blue-600">8</Text>
            <Text className="text-gray-600 text-xs mt-1">Teams</Text>
          </View>
          <View className="bg-white rounded-xl shadow-md p-4 flex-1 mx-1 items-center">
            <Text className="text-2xl font-bold text-blue-600">32</Text>
            <Text className="text-gray-600 text-xs mt-1">Matches</Text>
          </View>
          <View className="bg-white rounded-xl shadow-md p-4 flex-1 ml-2 items-center">
            <Text className="text-2xl font-bold text-blue-600">120+</Text>
            <Text className="text-gray-600 text-xs mt-1">Players</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
