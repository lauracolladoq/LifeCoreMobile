import AuthRequiredScreen from "@/screens/AuthRequiredScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { checkAuthStatus } from "@/utils/authCheck";
import { useRefreshOnFocus } from "@/utils/useRefreshOnFocus";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const verifyAuthStatus = async () => {
    try {
      const loggedIn = await checkAuthStatus();
      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.error("Error verifying auth status:", error);
    } finally {
      setLoading(false);
    }
  };

  useRefreshOnFocus(verifyAuthStatus);

  useEffect(() => {
    verifyAuthStatus();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return isLoggedIn ? <ProfileScreen /> : <AuthRequiredScreen />;
};

export default Profile;