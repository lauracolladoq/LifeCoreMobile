import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { fetchPosts } from "../lib/postsService";
import PostCard from "../components/post/PostCard";
import SemiBoldText from "@/components/texts/SemiBoldText";
import { useIsFocused } from "@react-navigation/native";
import PageLoader from "@/components/common/PageLoader";

const ExplorerScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const POSTS_PER_PAGE = 10;
  const isFocused = useIsFocused();

  const loadPosts = useCallback(async (page = 1) => {
    setLoading(true); 
    try {
      const postsData = await fetchPosts(page, POSTS_PER_PAGE);
      setHasMore(postsData.length === POSTS_PER_PAGE);
      setPosts((prev) => (page === 1 ? postsData : [...prev, ...postsData]));
    } catch (error) {
      console.log("Error loading posts:", error);
    } finally {
      setLoading(false); 
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadPosts(1);
    }
  }, [isFocused]);

  const handleRefresh = async () => {
    await loadPosts(1);
  };

  const loadMorePosts = async () => {
    if (!isFetching && hasMore) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1);
      await loadPosts(page + 1);
    }
  };

  if (loading) {
    return (
      <PageLoader />
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      contentContainerStyle={{ gap: 15 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      }
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetching && <PageLoader />
      }
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center">
          <SemiBoldText className="text-center">
            No posts available yet.
          </SemiBoldText>
        </View>
      )}
    />
  );
};

export default ExplorerScreen;