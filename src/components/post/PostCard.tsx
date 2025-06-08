import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import ProfileInfo from "./ProfileInfo";
import PostInfo from "./PostInfo";
import OptionsIcon from "@/assets/icons/options-icon";
import OptionsModal from "./OptionsModal";
import { getCurrentUser } from "@/lib/authService";
import Comments from "../comment/Comments";

const PostCard = ({ post }: { post: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);

  return (
    <View className="bg-white rounded-3xl p-4 shadow-md gap-3">
      <View className="flex-row items-center justify-between">
        <ProfileInfo user={post.user} currentUser={currentUser} />
        {currentUser?.id === post.user.id && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <OptionsIcon />
          </TouchableOpacity>
        )}
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
