import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import SemiBoldText from "../texts/SemiBoldText";

const ProfileInfo = ({ user, currentUser }) => {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to profile if the user is the current user
    if (user.id === currentUser?.id) {
      router.push("/(tabs)/profile");
    } else {
      router.push(`/users/${user.id}`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center gap-2"
    >
      <Image source={{ uri: user.avatar }} className="w-10 h-10 rounded-full" />
      <SemiBoldText>{user.username}</SemiBoldText>
    </TouchableOpacity>
  );
};

export default ProfileInfo;
