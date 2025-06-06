import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import SendIcon from "@/assets/icons/send-icon";
import IconButton from "../common/IconButton";

type CreateCommentProps = {
  postId: string;
  userId: string;
  onCommentCreated: () => void;
  createCommentService: (
    postId: string,
    userId: string,
    content: string
  ) => Promise<void>;
};

const CreateComment = ({
  postId,
  userId,
  onCommentCreated,
  createCommentService,
}: CreateCommentProps) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createCommentService(postId, userId, content.trim());
      setContent("");
      onCommentCreated();
    } catch (error) {
      console.log("Error creating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-row justify-between items-center py-2 px-3 rounded-3xl border-2 border-solid border-gray-300">
      <TextInput
        className="flex-1 py-1 px-2"
        style={{ fontFamily: "Nunito-Light", fontSize: 10 }}
        placeholder="Write a comment..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <IconButton
        icon={<SendIcon />}
        onPress={handleSubmit}
        disabled={loading || !content.trim()}
      />
    </View>
  );
};

export default CreateComment;
