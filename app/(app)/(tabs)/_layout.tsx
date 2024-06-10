import React, { useEffect } from 'react'
import { Tabs, router } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAuth } from '@/hooks/auth';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { getUser } = useAuth()
  useEffect(() => {
    getUser()
  }, [])
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // animation: 'fade',
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
        }} />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
        }} />
      <Tabs.Screen
        name='post'
        options={{
          title: 'Post',
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'add' : 'add-outline'} color={color} />,
        }}/>
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
        }} />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'menu' : 'menu-outline'} color={color} />
        }} />
    </Tabs>
  )
}