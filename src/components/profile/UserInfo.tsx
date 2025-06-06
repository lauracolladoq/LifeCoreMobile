import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import LightText from "../texts/LightText";
import Container from "../common/Container";
import SemiBoldText from "../texts/SemiBoldText";
import BoldText from "../texts/BoldText";
import FollowToggle from "./FollowToggle";
import { getFollowersCount, getFollowingCount } from "@/lib/followService";
import TinyText from "../texts/TinyText";

const UserInfo = ({ profile, currentUser }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // If is the user is logged in and is not viewing their own profile
  const showFollowToggle = currentUser && currentUser.id !== profile?.id;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [followers, following] = await Promise.all([
          getFollowersCount(profile.id),
          getFollowingCount(profile.id),
        ]);
        setFollowersCount(followers);
        setFollowingCount(following);
      } catch (error) {
        console.log(error);
      }
    };

    if (profile?.id) {
      fetchCounts();
    }
  }, [profile?.id]);

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
        {showFollowToggle && (
          <View className="absolute right-4 top-4">
            <FollowToggle currentUser={currentUser} profile={profile} />
          </View>
        )}
      </View>
      {/* Followers and Following */}
      <View className="flex-row justify-around w-full -mt-8">
        <View className="items-center">
          <SemiBoldText>{followersCount}</SemiBoldText>
          <TinyText className="text-gray-400">Followers</TinyText>
        </View>
        <View className="items-center">
          <SemiBoldText>{followingCount}</SemiBoldText>
          <TinyText className="text-gray-400">Following</TinyText>
        </View>
      </View>
      {/* Profile Info */}
      <Container className="items-center -mt-4 -mb-4">
        <BoldText>{profile?.name}</BoldText>
        <SemiBoldText className="text-gray-400">
          @{profile?.username}
        </SemiBoldText>
        {profile?.bio && (
          <TinyText className="text-center">{profile.bio}</TinyText>
        )}
      </Container>
    </View>
  );
};

export default UserInfo;
