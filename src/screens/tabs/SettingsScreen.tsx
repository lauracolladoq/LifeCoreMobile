import React, { useEffect, useState } from "react";
import UserInfo from "@/components/settings/UserInfo";
import { supabase } from "@/lib/supabase";
import { fetchUserProfile } from "@/lib/profileService";
import { View } from "react-native";
import SemiBoldText from "@/components/texts/SemiBoldText";
import SecurityVerificationItems from "@/components/settings/SecurityVerificationItems";
import AboutLegalItems from "@/components/settings/AboutLegalItems";
import OtherSettings from "@/components/settings/OtherSettings";
import CustomButton from "@/components/common/CustomButton";
import ContainerScroll from "@/components/common/ContainerScroll";

import { useRouter } from "expo-router";
import H1 from "@/components/texts/H1";
import PageLoader from "@/components/common/PageLoader";

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
    return <PageLoader />;
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
      <H1 className="text-center">Settings</H1>
      <UserInfo profile={{ ...profile, email }} />

      <View className="gap-2">
        <SemiBoldText>Security & Verification</SemiBoldText>
        <SecurityVerificationItems email={email} />
      </View>
      <View className="gap-2">
        <SemiBoldText>About & Legal</SemiBoldText>
        <AboutLegalItems />
      </View>
      <View className="gap-2">
        <SemiBoldText>Other settings</SemiBoldText>
        <OtherSettings />
      </View>
      <CustomButton title="Logout" onPress={handleLogout} />
    </ContainerScroll>
  );
};

export default SettingsScreen;
