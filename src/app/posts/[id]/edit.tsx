import React from "react";
import EditPostScreen from "@/screens/posts/EditPostScreen";
import { useLocalSearchParams } from "expo-router";

const EditPost = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <EditPostScreen postId={id} />;
};

export default EditPost;