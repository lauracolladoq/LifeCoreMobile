import React, { useState, useEffect } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import CustomButton from "@/components/common/CustomButton";
import ErrorText from "@/components/texts/ErrorText";
import Container from "@/components/common/Container";
import ContentInput from "@/components/post/ContentInput";
import { router } from "expo-router";
import ImageInput from "@/components/common/ImageInput";
import H1 from "@/components/texts/H1";
import { sucessNotification } from "@/utils/showNotification";

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

      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error: any) {
      setGeneralError("Error updating the post: " + error.message);
    } finally {
      setSaving(false);
      router.push("/profile");
      sucessNotification("Post updated successfully!");
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <Container className="flex flex-col justify-start h-full gap-6">
      <H1 className="text-center">Edit Post</H1>
      <View className="gap-3">
        <ImageInput
          label="Post Image"
          imageUri={post.image}
          height={250}
          borderRadius={24}
          onSelectImage={null}
          showIcon={false}
        />
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
