import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
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
      <View>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <Text>aa {token} aa</Text>
      </View>
    </>
  )
}