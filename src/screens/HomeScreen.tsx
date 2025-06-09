import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { fetchFollowingPosts } from "../lib/postsService";
import PostCard from "../components/post/PostCard";
import SemiBoldText from "@/components/texts/SemiBoldText";
import { useIsFocused } from "@react-navigation/native";
import { getFollowingCount } from "@/lib/followService";
import Container from "@/components/common/Container";
import TinyText from "@/components/texts/TinyText";
import PageLoader from "@/components/common/PageLoader";

const HomeScreen = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [followingCount, setFollowingCount] = useState(null);
  const isFocused = useIsFocused();

  const POSTS_PER_PAGE = 10;

  const loadPosts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const postsData = await fetchFollowingPosts(
          currentUser.id,
          page,
          POSTS_PER_PAGE
        );
        setHasMore(postsData.length === POSTS_PER_PAGE);
        setPosts((prev) => (page === 1 ? postsData : [...prev, ...postsData]));
      } catch (error) {
        console.log("Error loading posts:", error);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    },
    [currentUser.id]
  );

  const fetchFollowingCount = useCallback(async () => {
    try {
      const count = await getFollowingCount(currentUser.id);
      setFollowingCount(count);
    } catch (error) {
      console.log("Error fetching following count:", error);
      setFollowingCount(0);
    }
  }, [currentUser.id]);

  useEffect(() => {
    if (isFocused) {
      loadPosts(1);
      fetchFollowingCount();
    }
  }, [isFocused, loadPosts, fetchFollowingCount]);

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
      <View className="flex-1 justify-center items-center">
        <PageLoader />
      </View>
    );
  }

  if (followingCount === 0) {
    return (
      <Container className="justify-center items-center h-full">
        <SemiBoldText className="text-center mb-2">
          You are not following anyone yet.
        </SemiBoldText>
        <TinyText className="text-center text-sky-300">
          Explore and follow people to see their posts here!
        </TinyText>
      </Container>
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
      ListFooterComponent={isFetching && <PageLoader />}
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

export default HomeScreen;
