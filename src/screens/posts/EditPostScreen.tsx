import React, { useState, useEffect } from "react";
import { View, Alert, Image, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import CustomButton from "@/components/common/CustomButton";
import ErrorText from "@/components/texts/ErrorText";
import Container from "@/components/common/Container";
import BoldText from "@/components/texts/BoldText";
import ContentInput from "@/components/post/ContentInput";
import { router } from "expo-router";

interface EditPostScreenProps {
  postId?: string;
  onUpdateSuccess?: () => void;
}

const EditPostScreen: React.FC<EditPostScreenProps> = ({
  postId,
  onUpdateSuccess,
}) => {
  const [post, setPost] = useState<{
    id: number;
    content: string;
    image: string;
  } | null>(null);
  const [content, setContent] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [contentError, setContentError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        setGeneralError("Error loading post: " + error.message);
        setLoading(false);
        return;
      }

      setPost(data);
      setContent(data.content);
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const onSubmit = async () => {
    setContentError("");
    setGeneralError("");

    if (content.trim().length > 500) {
      setContentError("Content must be 500 characters or less.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from("posts")
        .update({ content: content.trim() })
        .eq("id", postId);

      if (error) {
        throw error;
      }

      Alert.alert("", "Post updated successfully!");
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error: any) {
      setGeneralError("Error updating the post: " + error.message);
    } finally {
      setSaving(false);
      router.back();
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <Container className="flex flex-col justify-start h-full gap-3">
      <BoldText className="text-lg text-center">Edit Post</BoldText>
      <View className="gap-3">
        {post.image && (
          <View className="items-center">
            <BoldText className="mb-2">Current Image</BoldText>
            <Image
              source={{ uri: post.image }}
              style={{
                height: 250,
                borderRadius: 24,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="border-2 border-gray-300 rounded-3xl bg-gray-100 w-full"
            />
          </View>
        )}
        <View>
          <ContentInput
            label="Content"
            placeholder="Update your post content"
            value={content}
            onChangeText={setContent}
          />
          {contentError ? <ErrorText>{contentError}</ErrorText> : null}
        </View>
      </View>
      <View>
        <CustomButton
          title={saving ? "Updating..." : "Update Post"}
          onPress={onSubmit}
          disabled={saving}
        />
      </View>
      {generalError ? <ErrorText>{generalError}</ErrorText> : null}
    </Container>
  );
};

export default EditPostScreen;