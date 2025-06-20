import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import PostsDisplay from "@/components/profile/PostsDisplay";
import UserInfo from "@/components/profile/UserInfo";
import { supabase } from "@/lib/supabase";
import { formatPost } from "@/utils/formatPost";
import { useRefreshOnFocus } from "@/utils/useRefreshOnFocus";
import { fetchCurrentUser } from "@/lib/authService";
import PageLoader from "@/components/common/PageLoader";

const MyProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser().then(setCurrentUser);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Load profile data
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      // Load posts for the user
      const { data: postsData } = await supabase
        .from("posts")
        .select("*, profiles(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const mappedPosts = postsData.map(formatPost);

      setProfile(profileData);
      setPosts(mappedPosts);
    } catch (error) {
      console.log("Error loading profile and posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useRefreshOnFocus(loadData);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <PageLoader />
    );
  }

  return (
    <View className="flex-1">
      <UserInfo profile={profile} currentUser={currentUser} />
      <PostsDisplay posts={posts} />
    </View>
  );
};

export default MyProfileScreen;
