import React, { useEffect, useState } from "react";
import UserInfo from "@/components/settings/UserInfo";
import { supabase } from "@/lib/supabase";
import { fetchUserProfile } from "@/lib/fetchUserProfile";
import { View, ActivityIndicator } from "react-native";
import BoldText from "@/components/texts/BoldText";
import SemiBoldText from "@/components/texts/SemiBoldText";
import SecurityVerificationItems from "@/components/settings/SecurityVerificationItems";
import AboutLegalItems from "@/components/settings/AboutLegalItems";
import OtherSettings from "@/components/settings/OtherSettings";
import CustomButton from "@/components/common/CustomButton";
import ContainerScroll from "@/components/common/ContainerScroll";

import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const initializeProfile = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        setEmail("");
      } else {
        setEmail(user.email || "");
        const profileData = await fetchUserProfile(user.id);
        setProfile(profileData || null);
      }
    } catch (error) {
      console.log("Error initializing profile:", error);
      setProfile(null);
      setEmail("");
    }

    setLoading(false);
  };

  useEffect(() => {
    initializeProfile();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error);
    } else {
      router.replace("/auth/login");
    }
  };

  return (
    <ContainerScroll style={{ gap: 15 }}>
      <BoldText className="text-xl text-center">Settings</BoldText>
      <UserInfo profile={{ ...profile, email }} />

      <View className="gap-2">
        <SemiBoldText className="text-sm">Security & Verification</SemiBoldText>
        <SecurityVerificationItems />
      </View>
      <View className="gap-2">
        <SemiBoldText className="text-sm">About & Legal</SemiBoldText>
        <AboutLegalItems />
      </View>
      <View className="gap-2">
        <SemiBoldText className="text-sm">Other settings</SemiBoldText>
        <OtherSettings />
      </View>
      <CustomButton title="Logout" onPress={handleLogout} />
    </ContainerScroll>
  );
};

export default SettingsScreen;