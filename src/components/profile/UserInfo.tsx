import React from "react";
import { View, Image } from "react-native";
import LightText from "../texts/LightText";
import Container from "../common/Container";
import SemiBoldText from "../texts/SemiBoldText";
import BoldText from "../texts/BoldText";
import FollowToggle from "./FollowToggle";

const UserInfo = ({ profile, currentUserId }) => {
  // Check if the current user is viewing their own profile
  const isOwnProfile = currentUserId === profile?.id;

  return (
    <View className="items-center">
      <View className="items-center w-full static">
        {profile?.banner && (
          <Image source={{ uri: profile.banner }} className="w-full h-60" />
        )}
        <Image
          source={{ uri: profile?.avatar }}
          className="w-24 h-24 rounded-full border border-gray-300 -mt-14"
        />
        {!isOwnProfile && currentUserId && (
          <View className="absolute right-4 top-4">
            <FollowToggle />
          </View>
        )}
      </View>
      {/* Followers and Following */}
      <View className="flex-row justify-around w-full -mt-8">
        <View className="items-center">
          <SemiBoldText>0</SemiBoldText>
          <LightText className="text-gray-400 text-xs">Followers</LightText>
        </View>
        <View className="items-center">
          <SemiBoldText>0</SemiBoldText>
          <LightText className="text-gray-400 text-xs">Following</LightText>
        </View>
      </View>
      {/* Profile Info */}
      <Container className="items-center -mt-8 -mb-4">
        <BoldText>{profile?.name}</BoldText>
        <SemiBoldText className="text-gray-400 text-sm">
          @{profile?.username}
        </SemiBoldText>
        {profile?.bio && (
          <LightText className="text-center text-sm">
            {profile.bio.length > 150
              ? profile.bio.slice(0, 150) + "..."
              : profile.bio}
          </LightText>
        )}
      </Container>
    </View>
  );
};

export default UserInfo;