import React, { useState, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import LikeIcon from "@/assets/icons/like-icon";
import { supabase } from "@/lib/supabase";
import LightText from "../texts/LightText";

interface LikeProps {
  postId: string;
  initialCount: number;
  initiallyLiked: boolean;
}

const Like: React.FC<LikeProps> = ({
  postId,
  initialCount,
  initiallyLiked,
}) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Check if the user has already liked the post
        const { data, error } = await supabase
          .from("likes")
          .select("id")
          .eq("post_id", postId)
          .eq("user_id", user.id)
          .single();

        if (!error && data) {
          setLiked(true);
        }
      }
    };

    fetchUserId();
  }, [postId]);

  const toggleLike = async () => {
    if (loading || !userId || !postId) return;
    setLoading(true);

    try {
      if (liked) {
        await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", userId);
        setLiked(false);
        setCount((c) => c - 1);
      } else {
        await supabase
          .from("likes")
          .insert([{ post_id: postId, user_id: userId }]);
        setLiked(true);
        setCount((c) => c + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-row items-center gap-1">
      <TouchableOpacity onPress={toggleLike} disabled={loading}>
        {liked ? <LikeIcon filled /> : <LikeIcon />}
      </TouchableOpacity>
      <LightText className="text-red-500 mr-2">{count}</LightText>
    </View>
  );
};

export default Like;