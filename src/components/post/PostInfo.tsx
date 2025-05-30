import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import LightText from "@/components/texts/LightText";
import LikeIcon from "@/assets/icons/like-icon";
import CommentIcon from "@/assets/icons/comment-icon";

const PostInfo = ({ post }: { post: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => setIsExpanded(!isExpanded); 

  return (
    <View>
      <Image
        source={{ uri: post.image }}
        className="w-full h-80 rounded-lg mb-2"
        resizeMode="cover"
      />
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center gap-1">
            <LikeIcon />
            <LightText className="text-red-500 mr-2">
              {post.likes_count}
            </LightText>
          </View>
          <CommentIcon/>
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
          >
            {post.content}
          </LightText>
          <TouchableOpacity onPress={toggleContent}>
            <LightText className="text-gray-500 text-xs mt-1">
              {isExpanded ? "See Less" : "See More"}
            </LightText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PostInfo;