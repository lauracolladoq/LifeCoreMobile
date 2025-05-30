export const formatPost = (post: any) => {
  return {
    id: post.id,
    image: post.image,
    content: post.content,
    created_at: post.created_at,
    user: {
      id: post.profiles?.id,
      name: post.profiles?.name,
      username: post.profiles?.username,
      avatar: post.profiles?.avatar,
    },
    likes_count: post.likes?.length || 0,
  };
};