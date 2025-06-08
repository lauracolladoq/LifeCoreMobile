import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import Modal from "react-native-modal";
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
import SemiBoldText from "../texts/SemiBoldText";

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  onClose,
  postId,
}) => {
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
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      onBackdropPress={onClose}
      style={{ margin: 0, justifyContent: "flex-end" }}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View className="bg-white rounded-t-3xl h-3/4">
        {/* Swipe Indicator */}
        <View className="w-10 h-1.5 bg-gray-300 rounded-full self-center my-2" />
        <SemiBoldText className="text-center">
            Comments
        </SemiBoldText>
        {/* Comments Section */}
        <View className="flex-1 p-5">
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 15 }}
            scrollEnabled
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <CommentCard
                comment={item}
                currentUserId={currentUser?.id || null}
                onDelete={handleDelete}
              />
            )}
            ListEmptyComponent={() =>
              !loading && (
                <View className="justify-center items-center">
                  <LightText className="text-center">
                    No comments available yet.
                  </LightText>
                </View>
              )
            }
          />

          {/* Add Comment Section */}
          {currentUser && username && (
            <CreateComment
              postId={postId}
              userId={currentUser.id}
              createCommentService={createComment}
              onCommentCreated={fetchComments}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
