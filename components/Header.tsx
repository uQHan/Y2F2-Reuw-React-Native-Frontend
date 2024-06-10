import { View, Text } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'

export default function Header() {
   return (
      <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1 , marginBottom: 20}}>
         <ThemedText type='subtitle'>Reuw</ThemedText>
      </View>
   )
}