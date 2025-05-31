import { supabase } from "./supabase";

export async function getLikesCount(postId: string) {
  const { count, error } = await supabase
    .from("likes")
    .select("id", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching likes count:", error);
    return 0;
  }

  return count || 0;
}