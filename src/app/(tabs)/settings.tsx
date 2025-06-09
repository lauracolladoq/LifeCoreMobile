import AuthRequiredScreen from "@/screens/AuthRequiredScreen";
import React, { useEffect, useState } from "react";
import { checkAuthStatus } from "@/utils/authCheck";
import { useRefreshOnFocus } from "@/utils/useRefreshOnFocus";
import SettingsScreen from "@/screens/SettingsScreen";
import PageLoader from "@/components/common/PageLoader";

const Settings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const verifyAuthStatus = async () => {
    try {
      const loggedIn = await checkAuthStatus();
      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.log("Error verifying auth status:", error);
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
      <PageLoader />
    );
  }

  return isLoggedIn ? <SettingsScreen /> : <AuthRequiredScreen />;
};

export default Settings;