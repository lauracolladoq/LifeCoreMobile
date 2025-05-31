import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import LightText from "@/components/texts/LightText";
import CommentIcon from "@/assets/icons/comment-icon";
import Like from "./Like";
import { checkAuthStatus } from "@/utils/authCheck";

const PostInfo = ({ post }: { post: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  const toggleContent = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);
      setIsAuthChecked(true);
    };

    fetchAuthStatus();
  }, []);

  if (!isAuthChecked) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View>
      <Image
        source={{ uri: post.image }}
        className="w-full h-80 rounded-lg mb-2"
        resizeMode="cover"
      />
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          {isAuthenticated ? (
            <Like
              key={post.id}
              postId={post.id}
              initialCount={post.likes_count}
              initiallyLiked={post.hasLiked}
            />
          ) : null}
          <CommentIcon />
        </View>
        <LightText className="text-gray-500 text-[8px] self-start">
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString()
            : "Unknown Date"}
        </LightText>
      </View>
      {post.content && (
        <View>
          <LightText
            className={`text-xs ${!isExpanded ? "text-ellipsis" : ""}`}
            numberOfLines={isExpanded ? undefined : 1}
            onTextLayout={(e) => {
              // Check if the number of lines exceeds 1
              setIsOverflowing(e.nativeEvent.lines.length > 1);
            }}
          >
            {post.content}
          </LightText>
          {isOverflowing && (
            <TouchableOpacity onPress={toggleContent}>
              <LightText className="text-gray-500 text-xs mt-1">
                {isExpanded ? "See Less" : "See More"}
              </LightText>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default PostInfo;