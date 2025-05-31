import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchUserProfile } from "@/lib/fetchUserProfile";
import { fetchUserPosts } from "@/lib/postsService";
import { getCurrentUser } from "@/lib/authService";
import UserInfo from "@/components/profile/UserInfo";
import PostsDisplay from "@/components/profile/PostsDisplay";

const UserProfileScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const userProfile = await fetchUserProfile(id);
        const userPosts = await fetchUserPosts(id);
        setProfile(userProfile);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View className="flex-1">
      {profile && (
        <UserInfo profile={profile} currentUser={currentUser} />
      )}
      <PostsDisplay posts={posts} />
    </View>
  );
};

export default UserProfileScreen;