import React, { useState } from "react";
import { View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

// @ts-ignore
import { EXPO_POSTS_BUCKET_NAME, EXPO_POSTS_BUCKET_URL } from "@env";
import CustomButton from "@/components/CustomButton";
import CustomText from "@/components/texts/CustomText";
import Container from "@/components/Container";
import CustomInput from "@/components/CustomInput";
import ImageInput from "@/components/ImageInput";

const bucketName = EXPO_POSTS_BUCKET_NAME;
const bucketUrl = EXPO_POSTS_BUCKET_URL;

const CreatePostScreen = () => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const BUCKET_NAME = bucketName;
  const PUBLIC_URL_BASE = bucketUrl;

  const onSelectImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const img = result.assets[0];
      const fileExtension = img.uri.split(".").pop()?.toLowerCase();

      const validExtensions = [
        "jpeg",
        "jpg",
        "png",
        "gif",
        "webp",
        "bmp",
        "tiff",
        "tif",
        "svg",
      ];
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        Alert.alert(
          "Error",
          "Please select a valid image file (jpeg, jpg, png, gif, webp, bmp, tiff, tif, svg)."
        );
        return;
      }

      setSelectedImage(img);
    }
  };

  const onSubmitPost = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image to upload.");
      return;
    }

    const img = selectedImage;
    const fileExtension = img.uri.split(".").pop()?.toLowerCase();
    const mimeTypes = {
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      bmp: "image/bmp",
      tiff: "image/tiff",
      tif: "image/tiff",
      svg: "image/svg+xml",
    };

    try {
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });

      const filePath = `${new Date().getTime()}.${fileExtension}`;
      const contentType = mimeTypes[fileExtension];

      // Upload the image to Supabase Storage
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, decode(base64), { contentType });

      if (error) {
        throw error;
      }

      const publicUrl = `${PUBLIC_URL_BASE}/${filePath}`;

      // Create a new post with the uploaded image
      const { error: insertError } = await supabase.from("posts").insert({
        user_id: (await supabase.auth.getUser()).data?.user?.id,
        image: publicUrl,
        content: content.trim(),
      });

      if (insertError) {
        // If there's an error inserting the post, delete the uploaded image
        const { error: deleteError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([filePath]);

        if (deleteError) {
          console.error("Error deleting the image:", deleteError.message);
        }

        throw insertError;
      }

      Alert.alert("", "Post created successfully!");
      setContent("");
      setSelectedImage(null);
    } catch (error) {
      Alert.alert("Error", "Error creating the post: " + error.message);
    }
  };

  return (
    <Container className="flex flex-col justify-start h-full gap-6">
      <CustomText className="text-xl font-bold text-center">
        Create a new post
      </CustomText>
      <ImageInput
        label="Image"
        imageUri={selectedImage?.uri || null}
        onSelectImage={onSelectImage}
      />
      <CustomInput
        label="Content"
        placeholder="Write your post content"
        value={content}
        onChangeText={setContent}
      />
      <View className="mt-auto">
        <CustomButton
          title="Create Post"
          onPress={onSubmitPost}
          disabled={false}
        />
      </View>
    </Container>
  );
};

export default CreatePostScreen;