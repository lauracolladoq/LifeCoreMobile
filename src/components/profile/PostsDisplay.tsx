import React, { useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import PostCard from "../post/PostCard";
import PostsGrid from "./PostsGrid";
import LightText from "../texts/LightText";
import GridPostsIcon from "@/assets/icons/grid-posts-icon";
import SinglePostsIcon from "@/assets/icons/single-posts-icon";

const PostsDisplay = ({ posts }: { posts: any[] }) => {
  const [viewMode, setViewMode] = useState<"grid" | "single">("grid");

  if (!posts.length) {
    return (
      <LightText className="text-center">No posts available yet.</LightText>
    );
  }

  return (
    <View className="flex-1 gap-2">
      {/* Toggle buttons */}
      <View className="flex-row justify-around">
        <TouchableOpacity
          onPress={() => setViewMode("grid")}
          activeOpacity={0.7}
          style={{ padding: 8, borderRadius: 9999 }}
        >
          <GridPostsIcon color={viewMode === "grid" ? "#000000" : "#a1a1aa"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode("single")}
          activeOpacity={0.7}
          style={{ padding: 8, borderRadius: 9999 }}
        >
          <SinglePostsIcon
            color={viewMode === "single" ? "#000000" : "#a1a1aa"}
          />
        </TouchableOpacity>
      </View>

      {viewMode === "grid" ? (
        <PostsGrid posts={posts} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 15,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default PostsDisplay;
