import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}>
      <Tabs.Screen 
      name='index'
      options={{
         title: 'Home',
         tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
      }}/>
      <Tabs.Screen 
      name='explore'
      options={{
         title: 'Explore',
         tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />
      }}/>
      <Tabs.Screen 
      name='profile'
      options={{
         title: 'Profile',
         tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
      }}/>
    </Tabs>
  )
}