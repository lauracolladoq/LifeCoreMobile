import React from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import LightText from "../texts/LightText";
import UploadIcon from "@/assets/icons/upload-icon";

interface ImageInputProps {
  label: string;
  imageUri: string | null;
  onSelectImage: () => void;
  height?: number;
  borderRadius?: number;
  width?: number;
  showIcon?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  imageUri,
  onSelectImage,
  height = 250,
  borderRadius = 24,
  width,
  showIcon = true,
}) => {
  return (
    <View>
      <LightText className="mb-2">{label}</LightText>
      <TouchableOpacity onPress={onSelectImage}>
        <ImageBackground
          source={imageUri ? { uri: imageUri } : undefined}
          style={{
            height,
            width,
            borderRadius,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="border-2 border-gray-300 rounded-3xl bg-gray-100"
        >
          {showIcon && <UploadIcon />}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default ImageInput;