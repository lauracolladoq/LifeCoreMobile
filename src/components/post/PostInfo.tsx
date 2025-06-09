import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import CommentIcon from "@/assets/icons/comment-icon";
import Like from "./Like";
import { checkAuthStatus } from "@/utils/authCheck";
import TinyText from "../texts/TinyText";
import CommentModal from "../comment/CommentModal"; 
import PageLoader from "../common/PageLoader";

const PostInfo = ({ post }: { post: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);

  const toggleContent = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);
      setIsAuthChecked(true);
    };

    fetchAuthStatus();
  }, []);

  if (!isAuthChecked) {
    return <PageLoader />;
  }

  return (
    <View>
      <Image
        source={{ uri: post.image }}
        className="w-full h-80 rounded-lg mb-2"
        resizeMode="cover"
      />
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          {isAuthenticated && (
            <Like
              key={post.id}
              postId={post.id}
              initialCount={post.likes_count}
              initiallyLiked={post.hasLiked}
            />
          )}

          <TouchableOpacity onPress={() => setCommentModalVisible(true)}>
            <CommentIcon />
          </TouchableOpacity>
        </View>
        <TinyText className="text-gray-500 self-start">
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString()
            : "Unknown Date"}
        </TinyText>
      </View>
      {post.content && (
        <View>
          <TinyText
            className={`${!isExpanded ? "text-ellipsis" : ""}`}
            numberOfLines={isExpanded ? undefined : 1}
            onTextLayout={(e) => setIsOverflowing(e.nativeEvent.lines.length > 1)}
          >
            {post.content}
          </TinyText>
          {isOverflowing && (
            <TouchableOpacity onPress={toggleContent}>
              <TinyText className="text-gray-500 mt-1">
                {isExpanded ? "See Less" : "See More"}
              </TinyText>
            </TouchableOpacity>
          )}
        </View>
      )}
      <CommentModal
        visible={commentModalVisible}
        onClose={() => setCommentModalVisible(false)}
        postId={post.id}
      />
    </View>
  );
};

export default PostInfo;