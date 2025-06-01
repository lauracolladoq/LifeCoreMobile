import { supabase } from "./supabase";

// Fetch all posts with likes and profiles
export const fetchPosts = async (page, postsPerPage) => {
  const from = (page - 1) * postsPerPage;
  const to = from + postsPerPage - 1;

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
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error fetching posts:", error);
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

export const fetchFollowingPosts = async (userId, page = 1, limit = 10) => {
  // Get the list of users that the current user is following
  const { data: following, error: followingError } = await supabase
    .from("followers")
    .select("user_followed_id")
    .eq("user_follower_id", userId);

  if (followingError) throw followingError;

  if (!following || following.length === 0) {
    return [];
  }

  const followedIds = following.map((f) => f.user_followed_id);

  // Get posts from followed users
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(
      `
    id,
    image,
    content,
    created_at,
    user_id,
    profiles!posts_user_id_fkey (
      id,
      name,
      username,
      avatar
    ),
    likes (id, user_id)
  `
    )
    .in("user_id", followedIds)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (postsError) throw postsError;

  return posts.map((post) => ({
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
    likes: post.likes || [],
    likes_count: post.likes?.length || 0,
  }));
};

// Fetch posts by a specific user
export const fetchUserPosts = async (userId: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      image,
      content,
      created_at,
      user_id,
      profiles!posts_user_id_fkey (
        id,
        name,
        username,
        avatar
      ),
      likes (id, user_id)
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error fetching user posts:", error);
    return [];
  }

  // Map to desired format
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
    likes: post.likes || [],
    likes_count: post.likes?.length || 0,
  }));
};
