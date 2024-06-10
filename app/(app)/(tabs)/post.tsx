import { View, Text, Pressable, TextInput, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { Link, router } from 'expo-router'
import Header from '@/components/Header'
import { apiUrl, mediaHeaders, tokenHeaders } from '@/constants/api'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Post() {
  const [title, setTile] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const data = new FormData()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri)

      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop() + '';

      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const formImage = {
        uri: localUri,
        type: 'image/*',
        name: filename
      }
      data.append('postImage', formImage as any)
      console.log(data)
    }
  };

  const postBlog = () => {
    if (title != '') {
      data.append('postTitle', title)
      data.append('postText', content)
      fetch(apiUrl + 'post', {
        method: 'POST',
        headers: mediaHeaders(),
        body: data
      })
        .then(() => {
          router.replace('(tabs)')
        })
    }
  }
  return (
    <SafeAreaView>
      <Header />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTile(text)}
        value={title}
        placeholder="You Post title"
      />
      <View>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.input}
          onChangeText={(text) => setContent(text)}
          value={content}
          placeholder="Content..."
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={pickImage}>
          <Ionicons name={'image'} size={64} style={styles.interactionIcon} />
        </Pressable>
        <View style={{ flexGrow: 1 }} />
        <Pressable onPress={postBlog} style={styles.postButton}>
          <ThemedText type='subtitle'>POST</ThemedText>
        </Pressable>
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 6,
    borderWidth: 1,
    padding: 10,
  },
  interactionIcon: {
    margin: 10,
    padding: 5,
    fontSize: 18,
    justifyContent: 'center'
  },
  image: {
    height: 480,
    width: Dimensions.get('window').width,
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'cover'
  },
  postButton: {
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
    marginEnd: 20
  }
});