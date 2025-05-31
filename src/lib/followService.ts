import { supabase } from "./supabase";

export const checkIfFollowing = async (followerId, followedId) => {
  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("user_follower_id", followerId)
    .eq("user_followed_id", followedId);

  if (error) throw error;
  return data.length > 0;
};

export const followUser = async (followerId, followedId) => {
  const { error } = await supabase.from("followers").insert({
    user_follower_id: followerId,
    user_followed_id: followedId,
  });

  if (error) throw error;
};

export const unfollowUser = async (followerId, followedId) => {
  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("user_follower_id", followerId)
    .eq("user_followed_id", followedId);

  if (error) throw error;
};

export async function getFollowersCount(userId) {
  const { count, error } = await supabase
    .from("followers")
    .select("id", { count: "exact", head: true })
    .eq("user_followed_id", userId);

  if (error) throw error;
  return count || 0;
}

export async function getFollowingCount(userId) {
  const { count, error } = await supabase
    .from("followers")
    .select("id", { count: "exact", head: true })
    .eq("user_follower_id", userId);

  if (error) throw error;
  return count || 0;
}
