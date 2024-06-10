import { View, Text, Image, Pressable } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth } from '@/hooks/auth'

export default function AppLayout() {
  const { token } = useAuth();
  if (!token) {
    return (
      <Redirect href="/login" />
    )
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}