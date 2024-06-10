import { View, Text, StyleSheet, TextInput, Image, ImageBackground } from 'react-native'
import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useAuth } from '@/hooks/auth'
import { baseUrl } from '@/constants/api'
import { styles } from './styles'
import { BlogScroll } from '@/components/BlogScroll'

export default function Profile() {
  const { currentUser } = useAuth();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <View></View>
        // <View style={styles.profileImageCotainer}>
        //   <Image source={{ uri: baseUrl + 'client/image/pfp/' + currentUser?.settings?.pfp_url }} style={[styles.pfpImage, { zIndex: 10 }]} />
        //   <ImageBackground source={{ uri: baseUrl + 'client/image/pfp/' + currentUser?.settings?.pfp_url }} style={[styles.pfpImage, { zIndex: 10 }]} />
        // </View>
      }>
      <View>
        <View style={styles.profileImageCotainer}>
          <Image source={{ uri: baseUrl + 'client/image/pfp/' + currentUser?.settings?.pfp_url }} style={[styles.pfpImage, { zIndex: 10 }]} />
        </View>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{currentUser?.settings?.username}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="default">{currentUser?.email}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.textContainer}>
          <ThemedText type="default">{currentUser?.settings?.bio}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.textContainer}>
          <ThemedText type="link">{currentUser?.settings?.website}</ThemedText>
        </ThemedView>
        {/* <BlogScroll userId = {currentUser?.user_id}/> */}
      </View>
      <View>
      </View>
    </ParallaxScrollView>
  )
}