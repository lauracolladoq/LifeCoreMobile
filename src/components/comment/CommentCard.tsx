import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ProfileInfo from "../post/ProfileInfo";
import LightText from "../texts/LightText";
import IconButton from "../common/IconButton";
import DeleteIcon from "@/assets/icons/delete-icon";

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

  return (
    <View className="flex-row items-start justify-between">
      <View>
        <ProfileInfo user={comment.user} currentUser={currentUserId} />
        <LightText>{comment.content}</LightText>
      </View>

      {canDelete && (
        <IconButton
          icon={<DeleteIcon />}
          onPress={() => onDelete(comment.id)}
        />
      )}
    </View>
  );
};

export default CommentCard;
