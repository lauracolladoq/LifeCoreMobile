import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchUserProfile } from "@/lib/profileService";
import { fetchUserPosts } from "@/lib/postsService";
import { fetchCurrentUser } from "@/lib/authService";
import UserInfo from "@/components/profile/UserInfo";
import PostsDisplay from "@/components/profile/PostsDisplay";
import PageLoader from "@/components/common/PageLoader";

const UserProfileScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser().then(setCurrentUser);
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const [userProfile, userPosts] = await Promise.all([
          fetchUserProfile(id),
          fetchUserPosts(id),
        ]);
        setProfile(userProfile);
        setPosts(userPosts);
      } catch (error) {
        console.log("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [id]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <View className="flex-1">
      {profile && <UserInfo profile={profile} currentUser={currentUser} />}
      <PostsDisplay posts={posts} />
    </View>
  );
};

export default UserProfileScreen;
