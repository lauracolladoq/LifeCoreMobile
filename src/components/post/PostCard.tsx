import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import ProfileInfo from "./ProfileInfo";
import PostInfo from "./PostInfo";
import OptionsIcon from "@/assets/icons/options-icon";
import OptionsModal from "./OptionsModal";

const PostCard = ({ post }: { post: any }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="bg-white rounded-3xl p-4 shadow-md gap-3">
      <View className="flex-row items-center justify-between">
        <ProfileInfo user={post.user} />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <OptionsIcon />
        </TouchableOpacity>
      </View>
      <PostInfo post={post} />
      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        post={post}
      />
    </View>
  );
};

export default PostCard;