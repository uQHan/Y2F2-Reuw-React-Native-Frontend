import { apiUrl, tokenHeaders } from "@/constants/api"
import { useCallback, useEffect, useRef, useState } from "react"
import { View, Text, ViewProps, FlatList, ActivityIndicator } from 'react-native'
import { Blog, BlogPost } from "./BlogPost"
import { Divider } from "./Divider"
import { useFocusEffect } from "expo-router"

export type BlogScrollProp = ViewProps & {
  userId?: number
}
export interface Blogs {
  current_page: number;
  data: Blog[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
export function BlogScroll({ userId, ...rest }: BlogScrollProp) {
  const user_id = userId ? 'profile/' + userId : ''
  const [data, setData] = useState([] as Blog[])
  const nextPageIdetifierRef = useRef<string>()
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false)
  const [extraData, setExtraData] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    fetch(nextPageIdetifierRef.current ?? apiUrl + user_id, {
      method: 'GET',
      headers: tokenHeaders(),
    })
      .then(response => response.json())
      .then(json => json.blogs)
      .then(json => {
        setData([...data, ...json.data])
        nextPageIdetifierRef.current = json.next_page_url
        setIsLoading(false)
        !isFirstPageReceived && setIsFirstPageReceived(true);
      })
  }, [nextPageIdetifierRef.current])

  const fetchNextPage = () => {
    if (!nextPageIdetifierRef.current) {
      // End of data.
      return;
    }
    fetchData();
  };

  useEffect(() => {
    fetchData()
  }, [])

  const ListEndLoader = () => {
    if (!isFirstPageReceived && isLoading) {
      // Show loader at the end of list when fetching next page data.
      return <ActivityIndicator size={'large'} />;
    }
  };

  if (!isFirstPageReceived && isLoading) {
    // Show loader when fetching first page data.
    return <ActivityIndicator size={'small'} />;
  }
  return (
    <>
      {!!data.length && <FlatList
        data={data}
        renderItem={({ item, index }) => <BlogPost blog={item as Blog} />}
        keyExtractor={item => item.blog_id}
        ItemSeparatorComponent={() => <View style={{ padding: 3 }} />}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListEndLoader} />}
    </>
  )
}
