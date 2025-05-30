import React from "react";
import { View, Image } from "react-native";
import { Link } from "expo-router";
import SemiBoldText from "../texts/SemiBoldText";

const ProfileInfo = ({ user }: { user: any }) => {
  return (
    <View className="flex-row items-center gap-2">
      <Image source={{ uri: user.avatar }} className="w-10 h-10 rounded-full" />
      <Link href={`/users/${user.id}`}>
        <SemiBoldText>{user.username}</SemiBoldText>
      </Link>
    </View>
  );
};

export default ProfileInfo;
