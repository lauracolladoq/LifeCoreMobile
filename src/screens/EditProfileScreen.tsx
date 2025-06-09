import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";
import CustomButton from "@/components/common/CustomButton";
import ErrorText from "@/components/texts/ErrorText";
import CustomInput from "@/components/common/CustomInput";
import * as FileSystem from "expo-file-system";
import ContainerScroll from "@/components/common/ContainerScroll";
import { decode } from "base64-arraybuffer";
import {
  EXPO_POSTS_BUCKET_PROFILE_PICTURES,
  EXPO_POSTS_BUCKET_BANNERS,
  DEFAULT_BANNER,
  DEFAULT_PROFILE_PICTURE,
  // @ts-ignore
} from "@env";
import ImageInput from "@/components/common/ImageInput";
import { router } from "expo-router";
import { fetchUserProfile } from "@/lib/profileService";
import H1 from "@/components/texts/H1";
import { sucessNotification } from "@/utils/showNotification";
import PageLoader from "@/components/common/PageLoader";

const BUCKET_AVATAR = EXPO_POSTS_BUCKET_PROFILE_PICTURES;
const BUCKET_BANNER = EXPO_POSTS_BUCKET_BANNERS;
const DEFAULT_AVATAR_URL = DEFAULT_PROFILE_PICTURE;
const DEFAULT_BANNER_URL = DEFAULT_BANNER;

const EditProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Profile fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  // New images selected
  const [newAvatar, setNewAvatar] = useState<any>(null);
  const [newBanner, setNewBanner] = useState<any>(null);

  // Validation errors
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [bannerError, setBannerError] = useState("");

  const userId = supabase.auth.getUser().then(({ data }) => data?.user?.id);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const currentUser = await userId;
        if (!currentUser) throw new Error("User not logged in");
        const data = await fetchUserProfile(currentUser);
        if (!data) console.log("No profile data found");

        setName(data.name);
        setUsername(data.username);
        setBio(data.bio || "");
        setAvatarUrl(data.avatar);
        setBannerUrl(data.banner);
      } catch (error: any) {
        setGeneralError("Error loading profile: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const onSelectImage = async (type: "avatar" | "banner") => {
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
        if (type === "avatar") {
          setAvatarError(
            "Invalid image file type. Please select a valid image."
          );
        } else {
          setBannerError(
            "Invalid image file type. Please select a valid image."
          );
        }
        return;
      }

      if (type === "avatar") {
        setNewAvatar(img);
        setAvatarError("");
      } else {
        setNewBanner(img);
        setBannerError("");
      }
    }
  };

  // Validations
  const validate = async () => {
    let valid = true;
    setNameError("");
    setUsernameError("");
    setBioError("");
    setGeneralError("");

    if (!name.trim() || name.trim().length < 3 || name.trim().length > 15) {
      setNameError("Name must be between 3 and 15 characters.");
      valid = false;
    }

    if (
      !username.trim() ||
      username.trim().length < 3 ||
      username.trim().length > 15
    ) {
      setUsernameError("Username must be between 3 and 15 characters.");
      valid = false;
    }

    if (bio.length > 150) {
      setBioError(`Bio must be less than 150 characters.`);
      valid = false;
    }

    return valid;
  };

  const uploadImage = async (file: any, bucket: string): Promise<string> => {
    const fileExtension = file.uri.split(".").pop();
    const fileName = `${new Date().getTime()}.${fileExtension}`;
    const base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: "base64",
    });
    const mimeTypes: any = {
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

    const contentType = mimeTypes[fileExtension];

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, decode(base64), { contentType });

    if (error) throw error;

    const publicUrl = supabase.storage.from(bucket).getPublicUrl(fileName)
      .data.publicUrl;
    return publicUrl;
  };

  const onSubmit = async () => {
    if (saving) return;
    setSaving(true);

    const valid = await validate();
    if (!valid) {
      setSaving(false);
      return;
    }

    try {
      const currentUser = await userId;
      if (!currentUser) throw new Error("User not logged in");

      const updateData: any = {
        name: name.trim(),
        username: username.trim(),
        bio: bio.trim(),
      };

      if (newAvatar) {
        updateData.avatar = await uploadImage(newAvatar, BUCKET_AVATAR);
      }
      if (newBanner) {
        updateData.banner = await uploadImage(newBanner, BUCKET_BANNER);
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", currentUser);

      if (error) throw error;

      sucessNotification("Profile updated successfully!");
      router.push("/profile");
    } catch (error: any) {
      // Check if error is related to duplicate username
      if (
        error.message &&
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        setUsernameError("Username already exists. Please choose another.");
        setGeneralError("");
      } else {
        setGeneralError(error.message || "Error updating profile");
        setUsernameError("");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <ContainerScroll>
      <H1 className="text-center">Edit Profile</H1>
      <View className="gap-3">
        <View>
          <CustomInput
            value={name}
            onChangeText={setName}
            placeholder="Your full name"
            autoCapitalize="words"
            label="Name"
          />
          {nameError ? <ErrorText>{nameError}</ErrorText> : null}
        </View>

        <View>
          <CustomInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            autoCapitalize="none"
            label="Username"
          />
          {usernameError ? <ErrorText>{usernameError}</ErrorText> : null}
        </View>

        <View>
          <CustomInput
            value={bio}
            onChangeText={setBio}
            placeholder="Short bio"
            multiline
            label="Bio"
          />
          {bioError ? <ErrorText>{bioError}</ErrorText> : null}
        </View>

        <View className="justify-between items-center flex-row">
          <ImageInput
            label="Avatar"
            imageUri={newAvatar?.uri || avatarUrl}
            onSelectImage={() => onSelectImage("avatar")}
            height={120}
            borderRadius={100}
            width={120}
          />
          <ImageInput
            label="Banner"
            imageUri={newBanner?.uri || bannerUrl}
            onSelectImage={() => onSelectImage("banner")}
            height={120}
            width={250}
          />
        </View>
        {avatarError && <ErrorText>{avatarError}</ErrorText>}
        {bannerError && <ErrorText>{bannerError}</ErrorText>}
      </View>

      <CustomButton
        title={saving ? "Saving..." : "Save Changes"}
        disabled={saving}
        onPress={onSubmit}
      />
      {generalError ? (
        <View className="items-center">
          {generalError && <ErrorText>{generalError}</ErrorText>}
        </View>
      ) : null}
    </ContainerScroll>
  );
};

export default EditProfileScreen;
