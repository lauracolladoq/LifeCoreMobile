import React from "react";
import { View, Image } from "react-native";
import { Link } from "expo-router";
import SemiBoldText from "../texts/SemiBoldText";

const ProfileInfo = ({ user }: { user: any }) => (
  <Link href={`/users/${user.id}`}>
    <View className="flex-row items-center">
      <Image
        source={{ uri: user.avatar }}
        className="w-10 h-10 rounded-full mr-2"
      />
      <SemiBoldText>{user.username}</SemiBoldText>
    </View>
  </Link>
);

export default ProfileInfo;