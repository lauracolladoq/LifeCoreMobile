import AuthRequiredScreen from "@/screens/AuthRequiredScreen";
import React, { useEffect, useState } from "react";
import { checkAuthStatus } from "@/utils/authCheck";
import { useRefreshOnFocus } from "@/utils/useRefreshOnFocus";
import HomeScreen from "@/screens/HomeScreen";
import { fetchCurrentUser } from "@/lib/authService";
import Container from "@/components/common/Container";
import PageLoader from "@/components/common/PageLoader";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyAuthStatus = async () => {
    try {
      const loggedIn = await checkAuthStatus();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      }
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

  // Show loading screen while checking authentication or fetching user data
  if (loading) {
    return (
      <PageLoader />
    );
  }

  // Show the appropriate screen based on authentication status
  return isLoggedIn ? (
    <Container>
      <HomeScreen currentUser={currentUser} />
    </Container>
  ) : (
    <AuthRequiredScreen />
  );
};

export default Home;