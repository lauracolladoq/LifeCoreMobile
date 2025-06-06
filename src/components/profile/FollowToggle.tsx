import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import FollowIcon from "@/assets/icons/follow-icon";
import FollowingIcon from "@/assets/icons/following-icon";
import SemiBoldText from "../texts/SemiBoldText";
import { checkIfFollowing, followUser, unfollowUser } from "@/lib/followService";

const FollowToggle = ({ currentUser, profile }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (currentUser?.id && profile?.id) {
          const following = await checkIfFollowing(currentUser.id, profile.id);
          setIsFollowing(following);
        }
      } catch (error) {
        console.log("Error checking follow status:", error);
      }
    };

    checkStatus();
  }, [currentUser?.id, profile?.id]);

  const toggleFollow = async () => {
    if (loading) return;

    setLoading(true);

    try {
      if (isFollowing) {
        await unfollowUser(currentUser.id, profile.id);
        setIsFollowing(false);
      } else {
        await followUser(currentUser.id, profile.id);
        setIsFollowing(true);
      }
    } catch (error) {
      console.log("Error toggling follow status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleFollow}
      disabled={loading}
      className="flex-row rounded-full px-4 py-2 items-center gap-2 justify-center"
      style={{ backgroundColor: "#FFFFFF90" }}
    >
      {isFollowing ? <FollowingIcon /> : <FollowIcon />}
      <SemiBoldText>
        {isFollowing ? "Following" : "Follow"}
      </SemiBoldText>
    </TouchableOpacity>
  );
};

export default FollowToggle;