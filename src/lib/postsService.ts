import { supabase } from "./supabase";

// Fetch all posts from the database
export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      image,
      content,
      created_at,
      profiles!posts_user_id_fkey (
        id,
        name,
        username,
        avatar
      ),
      likes (id)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  // Map the posts to include a consistent format
  return data.map((post) => ({
    id: post.id,
    image: post.image,
    content: post.content,
    created_at: post.created_at,
    user: {
      // @ts-ignore
      id: post.profiles?.id,
      // @ts-ignore
      name: post.profiles?.name,
      // @ts-ignore
      username: post.profiles?.username,
      // @ts-ignore
      avatar: post.profiles?.avatar,
    },
    likes_count: post.likes?.length || 0,
  }));
};

// Realtime subscription to posts
export const subscribeToPosts = (callback: (change: any) => void) => {
  const subscription = supabase
    .channel("realtime:posts")
    .on(
      "postgres_changes",
      {
        event: "*", // INSERT, UPDATE, DELETE
        schema: "public",
        table: "posts",
      },
      callback
    )
    .subscribe();

  return subscription;
};