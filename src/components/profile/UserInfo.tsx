import React from "react";
import { View, Image } from "react-native";
import LightText from "../texts/LightText";
import CustomButton from "../CustomButton";
import Container from "../Container";
import SemiBoldText from "../texts/SemiBoldText";
import BoldText from "../texts/BoldText";

const UserInfo = ({ profile }) => {
  return (
    <View className="items-center w-full">
      {/* Banner and Avatar */}
      <View className="items-center w-full">
        {profile?.banner && (
          <Image source={{ uri: profile.banner }} className="w-full h-60" />
        )}

        <Image
          source={{ uri: profile?.avatar }}
          className="w-24 h-24 rounded-full border border-gray-300 -mt-14"
        />
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
      {/* Profile Info and Button */}
      <Container className="w-full items-center -mt-6">
        <BoldText>{profile?.name}</BoldText>
        <SemiBoldText className="text-gray-400 text-sm">
          @{profile?.username}
        </SemiBoldText>
        {profile?.bio && (
          <LightText className="text-center text-sm mt-2">
            {profile.bio.length > 150
              ? profile.bio.slice(0, 150) + "..."
              : profile.bio}
          </LightText>
        )}
        <View className="w-full mt-2">
          <CustomButton
            title="Edit Profile"
            onPress={() => console.log("Open Edit Modal")}
          />
        </View>
      </Container>
    </View>
  );
};

export default UserInfo;
