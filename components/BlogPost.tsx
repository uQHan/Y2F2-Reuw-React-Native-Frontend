import { View, Text, Image, ViewProps, TouchableWithoutFeedback, StyleSheet, Dimensions, Pressable, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { apiUrl, baseUrl, tokenHeaders } from '@/constants/api';
import { User, useAuth } from '@/hooks/auth';
import { Ionicons } from '@expo/vector-icons';

export interface Blog {
  blog_id: string;
  user_id: string;
  title: string;
  tags: null;
  content: null | string;
  image_url: null | string;
  locked: number;
  deleted: number;
  created_at: Date;
  updated_at: Date;
  bookmarks_count: number;
  comments_count: number;
  likes_count: number;
  user: User;
  comments: Comment[];
}
export interface Comment {
  comment_id: string;
  blog_id: string;
  user_id: string;
  reply_id: null;
  content: string;
  image_url: string;
  locked: number;
  deleted: number;
  created_at: Date;
  updated_at: Date;
  user: User;
}

type BlogProps = ViewProps & {
  blog: Blog
}

export const BlogPost = ({ blog, ...rest }: BlogProps) => {
  const { currentUser } = useAuth()
  const [liked, setIsLiked] = useState(false)
  const [bookmarked, setIsBookmarked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [comment, onChangeComment] = useState('')
  const likePost = () => {
    setIsLiked((value) => !value)
    if (!liked)
      blog.likes_count = blog.likes_count + 1
    else blog.likes_count = blog.likes_count - 1
    fetch(apiUrl + 'like/' + blog.blog_id, {
      method: 'GET',
      headers: tokenHeaders()
    })
  }
  const bookmarkPost = () => {
    setIsBookmarked((value) => !value)
    if (!bookmarked)
      blog.bookmarks_count = blog.bookmarks_count + 1
    else blog.bookmarks_count = blog.bookmarks_count - 1
    fetch(apiUrl + 'bookmark/' + blog.blog_id, {
      method: 'GET',
      headers: tokenHeaders()
    })
  }
  const isLiked = () => {
    fetch(apiUrl + 'isLiked/' + blog.blog_id, {
      method: 'GET',
      headers: tokenHeaders()
    }).then(response => response.json())
      .then(json => {
        setIsLiked(json)
      })
  }
  const isBookmarked = () => {
    fetch(apiUrl + 'isBookmarked/' + blog.blog_id, {
      method: 'GET',
      headers: tokenHeaders(),
    }).then(response => response.json())
      .then(json => {
        setIsBookmarked(json)
      })
  }
  const postComment = () => {
    blog.comments.push({ content: comment, user: currentUser } as Comment)
    blog.comments_count = blog.comments_count + 1
    onChangeComment('')
    fetch(apiUrl + 'comment', {
      method: 'POST',
      headers: tokenHeaders(),
      body: JSON.stringify({
        blogID: blog.blog_id,
        commentText: comment
      })
    })
  }
  useEffect(() => {
    isLiked()
    isBookmarked()
  }, [])
  return (
    <View>
      <ThemedView style={{ padding: 10, flexDirection: 'row' }}>
        <ThemedView style={{ marginEnd: 5 }}>
          <Image source={{ uri: baseUrl + 'client/image/pfp/' + blog.user.settings?.pfp_url }} style={styles.blogPfp} />
        </ThemedView>
        <ThemedView style={{ flex: 1 }}>
          <ThemedText type='subtitle'>{blog.user.settings?.username}</ThemedText>
          <ThemedText type='default'>{blog.user.email}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={{ padding: 7 }}>
        <ThemedText type='subtitle'>{blog.title}</ThemedText>
      </ThemedView>
      <ThemedView style={{ padding: 7, paddingBottom: 10 }}>
        <ThemedText type='default'>{blog.content}</ThemedText>
      </ThemedView>
      <View style={{ padding: 3 }}>
        {/* <Image source={{ uri: baseUrl + 'client/image/' + blog.image_url }} style={{ height: 200, width: 200}} /> */}
        {blog.image_url && <Image source={{ uri: baseUrl + 'client/image/' + blog.image_url }} style={styles.blogImage} />}
      </View>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView style={{ flexDirection: 'row', alignSelf: 'center', flexGrow: 1 }}>
          <Pressable onPress={() => likePost()} style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <ThemedText style={styles.interactionCount}>{blog.likes_count}</ThemedText>
            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={18} color={'red'} style={styles.interactionIcon} />
          </Pressable>
          <Pressable onPress={() => setIsOpen((value) => !value)} style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <ThemedText style={styles.interactionCount}>{blog.comments_count}</ThemedText>
            <Ionicons name={'chatbox-outline'} size={18} style={styles.interactionIcon} />
          </Pressable>
          <Pressable onPress={() => bookmarkPost()} style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <ThemedText style={styles.interactionCount}>{blog.bookmarks_count}</ThemedText>
            <Ionicons name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={18} color={'blue'} style={styles.interactionIcon} />
          </Pressable>
        </ThemedView>
      </ThemedView>
      {isOpen && <FlatList
        data={blog.comments}
        renderItem={({ item }) =>
          <ThemedView style={{ padding: 10, flexDirection: 'row', alignSelf: 'center' }}>
            <ThemedView style={{ marginEnd: 5 }}>
              <Image source={{ uri: baseUrl + 'client/image/pfp/' + item.user.settings?.pfp_url }} style={styles.commentPfp} />
            </ThemedView>
            <ThemedView style={{ flex: 1 }}>
              <ThemedText type='defaultSemiBold'>{item.user.settings?.username}</ThemedText>
              <ThemedText type='default'>{item.content}</ThemedText>
            </ThemedView>
          </ThemedView>}
        ListFooterComponent={
          <ThemedView style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeComment(text)}
              value={comment}
              placeholder="Write a comment"
            />
            <Pressable onPress={() => postComment()}>
              <Ionicons name={'arrow-back'} size={18} style={styles.commentIcon} />
            </Pressable>
          </ThemedView>} />}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    flexGrow: 1
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  blogPfp: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    borderRadius: 40
  },
  commentPfp: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
    borderRadius: 40
  },
  blogImage: {
    height: 800,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
  },
  interactionCount: {
    padding: 5,
    fontSize: 18,
    justifyContent: 'center'
  },
  interactionIcon: {
    padding: 5,
    fontSize: 18,
    justifyContent: 'center'
  },
  commentIcon: {
    padding: 5,
    fontSize: 32,
    justifyContent: 'center'
  }
})