import { supabase } from "./supabase";

export const createComment = async (
  postId: string,
  userId: string,
  content: string
) => {
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: userId,
    content: content,
  });

  if (error) throw error;
};

export const deleteComment = async (commentId: string) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;
};

export const getCommentsForPost = async (postId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      user_id,
      profiles!comments_user_id_fkey (
        id,
        username,
        avatar
      )
    `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.log("Error fetching comments:", error);
    throw error;
  }

  return (data || []).map((comment) => ({
    id: comment.id,
    content: comment.content,
    created_at: comment.created_at,
    user_id: comment.user_id,
    user: {
      // @ts-ignore
      id: comment.profiles?.id,
      // @ts-ignore
      username: comment.profiles?.username,
      // @ts-ignore
      avatar: comment.profiles?.avatar,
    },
  }));
};

export const getUserComments = async (userId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};
