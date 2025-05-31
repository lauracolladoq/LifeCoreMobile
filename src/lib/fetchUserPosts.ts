import { supabase } from "./supabase";

export const fetchUserPosts = async (userId: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user posts:", error);
  }

  return data;
};