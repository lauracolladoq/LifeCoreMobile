import React from "react";
import { View } from "react-native";
import ProfileInfo from "./ProfileInfo";
import PostInfo from "./PostInfo";

const PostCard = ({ post }: { post: any }) => (
  <View className="bg-white rounded-3xl p-4 shadow-md">
    <ProfileInfo user={post.user}/>
    <PostInfo post={post} />
  </View>
);

export default PostCard;