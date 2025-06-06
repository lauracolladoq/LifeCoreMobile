import { supabase } from "@/lib/supabase";

export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.log("Error fetching user profile:", error);
  }

  return data;
};