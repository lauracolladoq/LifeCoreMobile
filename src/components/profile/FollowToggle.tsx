import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import FollowIcon from "@/assets/icons/follow-icon";
import FollowingIcon from "@/assets/icons/following-icon";
import SemiBoldText from "../texts/SemiBoldText";
import {
  checkIfFollowing,
  followUser,
  unfollowUser,
} from "@/lib/followService";

const FollowToggle = ({ currentUser, profile, onFollowerChange }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(currentUser.id, profile.id);
        onFollowerChange(-1);
        setIsFollowing(false);
      } else {
        await followUser(currentUser.id, profile.id);
        onFollowerChange(1);
        setIsFollowing(true);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <TouchableOpacity
      onPress={toggleFollow}
      className="flex-row rounded-full px-4 py-2 items-center gap-2 justify-center"
      style={{ backgroundColor: "#FFFFFF90" }}
    >
      {isFollowing ? <FollowingIcon /> : <FollowIcon />}
      <SemiBoldText>{isFollowing ? "Following" : "Follow"}</SemiBoldText>
    </TouchableOpacity>
  );
};

export default FollowToggle;
