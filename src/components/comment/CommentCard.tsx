import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import LightText from "../texts/LightText";
import IconButton from "../common/IconButton";
import DeleteIcon from "@/assets/icons/delete-icon";
import SemiBoldText from "../texts/SemiBoldText";
import { router } from "expo-router";

type CommentCardProps = {
  comment: {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    user: {
      id: string;
      username: string;
      avatar: string | null;
    };
  };
  currentUserId: string | null;
  onDelete: (commentId: string) => void;
};

const CommentCard = ({
  comment,
  currentUserId,
  onDelete,
}: CommentCardProps) => {
  // Check if the current user is the owner of the comment
  const canDelete = currentUserId === comment.user_id;

  const handlePress = () => {
    // Navigate to profile if the user is the current user
    if (comment.user.id === currentUserId) {
      router.push("/(tabs)/profile");
    } else {
      router.push(`/users/${comment.user.id}`);
    }
  };

  return (
    <View className="flex-row items-start gap-3 ">
      <TouchableOpacity
        onPress={handlePress}
        className="flex-row items-center gap-2"
      >
        <Image
          source={{ uri: comment.user.avatar }}
          className="w-10 h-10 rounded-full"
        />
      </TouchableOpacity>
      <View className="flex-shrink">
        <SemiBoldText>{comment.user.username}</SemiBoldText>
        <LightText>{comment.content}</LightText>
      </View>
      <View className="flex-1" />
      {canDelete && (
        <IconButton
          icon={<DeleteIcon width={24} height={24} />}
          onPress={() => onDelete(comment.id)}
        />
      )}
    </View>
  );
};

export default CommentCard;
