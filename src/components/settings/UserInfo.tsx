import ArrowIcon from "@/assets/icons/arrow-icon";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import SemiBoldText from "../texts/SemiBoldText";

interface Profile {
  avatar: string;
  username: string;
  email: string;
}

interface UserInfoProps {
  profile: Profile;
}

const UserInfo: React.FC<UserInfoProps> = ({ profile }) => {
  return (
    <TouchableOpacity
      onPress={null}
      className="bg-white rounded-3xl p-3 flex-row items-center gap-4 justify-start w-full shadow-md"
    >
      <Image
        source={{ uri: profile.avatar }}
        resizeMode="cover"
        width={80}
        height={80}
        borderRadius={100}
      />
      <View>
        <SemiBoldText>{profile.username}</SemiBoldText>
        <SemiBoldText className=" text-xs text-gray-400">
          {profile.email}
        </SemiBoldText>
      </View>
      <View className="ml-auto">
        <ArrowIcon />
      </View>
    </TouchableOpacity>
  );
};

export default UserInfo;
