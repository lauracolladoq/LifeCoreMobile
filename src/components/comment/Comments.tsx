import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { supabase } from "@/lib/supabase";
import {
  getCommentsForPost,
  deleteComment,
  createComment,
} from "@/lib/commentService";
import { fetchUserProfile } from "@/lib/profileService";
import CreateComment from "./CreateComment";
import CommentCard from "./CommentCard";
import LightText from "../texts/LightText";

const Comments = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await getCommentsForPost(postId);
      setComments(data);
    } catch (err) {
      console.log("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setCurrentUser(user);

          const profile = await fetchUserProfile(user.id);
          setUsername(profile?.username || "Unknown");
        }
      } catch (error) {
        console.log("Error fetching current user:", error);
      }
    };

    fetchComments();
    fetchCurrentUser();
  }, [postId]);

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  const renderComment = ({ item }: { item: any }) => (
    <CommentCard
      comment={item}
      currentUserId={currentUser?.id || null}
      onDelete={handleDelete}
    />
  );

  return (
    <View className="gap-3">
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentCard
            comment={item}
            currentUserId={currentUser?.id || null}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={() =>
          !loading && (
            <View className="flex-1 justify-center items-center">
              <LightText className="text-center">
                No comments available yet.
              </LightText>
            </View>
          )
        }
      />
      {currentUser && username && (
        <CreateComment
          postId={postId}
          userId={currentUser.id}
          createCommentService={createComment}
          onCommentCreated={fetchComments}
        />
      )}
    </View>
  );
};

export default Comments;
