import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { fetchPosts, subscribeToPosts } from "../lib/postsService";
import PostCard from "../components/post/PostCard";
import CustomText from "@/components/texts/LightText";
import { supabase } from "../lib/supabase";
import { useRefreshOnFocus } from "@/utils/useRefreshOnFocus";
import SemiBoldText from "@/components/texts/SemiBoldText";

const ExplorerScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapPost = (post: any, prevPosts: any[]) => {
    // Get the existing post if it exists to preserve user info
    const existingPost = prevPosts.find((p) => p.id === post.id);
    return {
      id: post.id,
      image: post.image,
      content: post.content,
      created_at: post.created_at,
      user: existingPost?.user || {
        id: post.profiles?.id,
        name: post.profiles?.name,
        username: post.profiles?.username,
        avatar: post.profiles?.avatar,
      },
      likes_count: post.likes?.length || 0,
    };
  };

  const loadPosts = async () => {
    try {
      const postsData = await fetchPosts();
      setPosts(postsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useRefreshOnFocus(loadPosts);
  
  useEffect(() => {
    loadPosts();

    const subscription = subscribeToPosts(async (change) => {
      const { eventType, new: newPost, old: oldPost } = change;

      if (eventType === "INSERT" || eventType === "UPDATE") {
        // Get the profile data for the new or updated post
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, name, username, avatar")
          .eq("id", newPost.user_id)
          .single();

        if (profileError) {
          console.error("Error fetching profile for new post:", profileError);
        }

        const fullPost = {
          ...newPost,
          profiles: profileData || null,
        };

        setPosts((prevPosts) => {
          if (eventType === "INSERT") {
            return [mapPost(fullPost, prevPosts), ...prevPosts];
          } else {
            return prevPosts.map((post) =>
              post.id === fullPost.id ? mapPost(fullPost, prevPosts) : post
            );
          }
        });
      } else if (eventType === "DELETE") {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== oldPost.id)
        );
      }
    });

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      contentContainerStyle={{ gap:15 }}
      showsVerticalScrollIndicator={false}
      // Automatically check if the list is empty
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center">
          <SemiBoldText className="text-center">No posts available yet.</SemiBoldText>
        </View>
      )}
    />
  );
};

export default ExplorerScreen;

