import React from "react";
import { View, Image } from "react-native";
import CustomText from "@/components/texts/CustomText";

const PostInfo = ({ post }: { post: any }) => (
  <View>
    <Image
      source={{ uri: post.image }}
      className="w-full h-80 rounded-lg mb-2"
      resizeMode="cover"
    />
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <CustomText className="text-red-500 mr-2">
          Likes {post.likes_count}
        </CustomText>
        <CustomText className="text-red-500 mr-2">Comments</CustomText>
      </View>
      <CustomText className="text-gray-500 text-[8px] self-start">
        {post.created_at
          ? new Date(post.created_at).toLocaleDateString()
          : "Unknown Date"}
      </CustomText>
    </View>
    {post.content && (
      <CustomText className="text-sm">{post.content}</CustomText>
    )}
  </View>
);

export default PostInfo;