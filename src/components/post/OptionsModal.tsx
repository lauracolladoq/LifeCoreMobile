import React from "react";
import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import BoldText from "../texts/BoldText";
import EditIcon from "@/assets/icons/edit-icon";
import DeleteIcon from "@/assets/icons/delete-icon";
import { supabase } from "@/lib/supabase";
import Toast from "react-native-toast-message";
import { sucessNotification } from "@/utils/showNotification";
import Modal from "react-native-modal";

interface OptionsModalProps {
  visible: boolean;
  onClose: () => void;
  post: any;
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  visible,
  onClose,
  post,
}) => {
  const handleDelete = async () => {
    try {
      const imageKey = post.image.split("/").pop();
      const { error: storageError } = await supabase.storage
        .from(process.env.EXPO_POSTS_BUCKET_NAME)
        .remove([imageKey]);

      if (storageError) {
        throw new Error(`Error deleting image: ${storageError.message}`);
      }

      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", post.id);

      if (deleteError) {
        throw new Error(`Error deleting post: ${deleteError.message}`);
      }

      router.push("/profile");
      sucessNotification("Post deleted successfully!");
      onClose();
    } catch (error: any) {
      console.log("Error deleting post:", error);
    }
  };

  const confirmDelete = () => {
    onClose();
    Toast.show({
      type: "confirmation",
      text1: "Are you sure you want to delete this post?",
      props: {
        onYes: () => {
          handleDelete();
          Toast.hide();
        },
        onNo: () => {
          Toast.hide();
        },
      },
      autoHide: false,
    });
  };
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      onBackdropPress={null}
      style={{ margin: 0, justifyContent: "flex-end" }}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View className="bg-white rounded-t-3xl">
        {/* Swipe Indicator */}
        <View className="w-10 h-1.5 bg-gray-300 rounded-full self-center my-2" />
        {/* Options */}
        <View className="flex-row items-center justify-around px-5 py-5">
          {/* Edit Option */}
          <TouchableOpacity
            className="bg-white rounded-3xl py-5 w-1/3 shadow-2xl justify-center items-center gap-1"
            onPress={() => {
              onClose();
              router.push(`/posts/${post.id}/edit`);
            }}
          >
            <EditIcon />
            <BoldText>Edit</BoldText>
          </TouchableOpacity>
          {/* Delete Option */}
          <TouchableOpacity
            className="bg-white rounded-3xl py-5 w-1/3 shadow-2xl justify-center items-center gap-1"
            onPress={confirmDelete}
          >
            <DeleteIcon />
            <BoldText className="text-red-600">Delete</BoldText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OptionsModal;
