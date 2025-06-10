import React, { useEffect, useState } from "react";
import CreatePostScreen from "@/screens/posts/CreatePostScreen";
import AuthRequiredScreen from "@/screens/assets/AuthRequiredScreen";
import { checkAuthStatus } from "@/utils/authCheck";
import { useRefreshOnFocus } from "@/utils/useRefreshOnFocus";
import PageLoader from "@/components/common/PageLoader";

const CreatePost = () => {
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

  return isLoggedIn ? <CreatePostScreen /> : <AuthRequiredScreen />;
};

export default CreatePost;