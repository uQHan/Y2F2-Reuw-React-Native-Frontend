import { View, Text, Platform, Image, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';
import { Collapsible } from '@/components/Collapsible';
import { useAuth } from '@/hooks/auth';
import { Divider } from '@/components/Divider';


export default function Settings() {
   const { logout } = useAuth();
   const handleLogout = useCallback(async () => {
      await logout()
   }, []);
   return (
      <ThemedView style={styles.content}>
         {/* <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} /> */}  
         <Ionicons name={'settings'} size={64} style={{ alignSelf: 'center' }} />
         <Divider/>
         <Pressable onPress={handleLogout} style={{ flexDirection: 'row' }}>
            <Ionicons name={'chevron-forward-outline'} size={18} />
            <ThemedText type='defaultSemiBold'>Log out</ThemedText>
         </Pressable>
      </ThemedView>
   )
}

const styles = StyleSheet.create({
   headerImage: {
      color: '#808080',
      bottom: -90,
      left: -35,
      position: 'absolute',
   },
   titleContainer: {
      flexDirection: 'row',
      gap: 8,
   }, content: {
      flex: 1,
      padding: 32,
      gap: 16,
      overflow: 'hidden',
   },
});