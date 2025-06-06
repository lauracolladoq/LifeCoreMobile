import React from "react";
import { View, Modal, TouchableOpacity, Alert, Text } from "react-native";
import { Link } from "expo-router";
import Container from "../common/Container";
import BoldText from "../texts/BoldText";
import EditIcon from "@/assets/icons/edit-icon";
import DeleteIcon from "@/assets/icons/delete-icon";
import CloseIcon from "@/assets/icons/close-icon";
import { supabase } from "@/lib/supabase";

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

      Alert.alert("", "Post deleted successfully!");
      onClose();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: "#00000090" }}
      >
        <Container className="bg-white rounded-3xl rounded-b-none">
          {/* Close button */}
          <TouchableOpacity className="items-end pb-3" onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>

          {/* Options */}
          <View className="flex-row items-center justify-around px-5 py-5">
            {/* Edit Option */}
            <View className="bg-white rounded-3xl py-5 w-1/3 shadow-2xl">
              <View className="justify-center items-center gap-1">
                <EditIcon />
                <Link href={`/posts/${post.id}/edit`} onPress={onClose}>
                  <BoldText>Edit</BoldText>
                </Link>
              </View>
            </View>
            {/* Delete Option */}
            <View className="bg-white rounded-3xl py-5 w-1/3 shadow-2xl">
              <TouchableOpacity
                className="justify-center items-center gap-1"
                onPress={handleDelete}
              >
                <DeleteIcon />
                <BoldText className="text-red-600">Delete</BoldText>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </View>
    </Modal>
  );
};

export default OptionsModal;
