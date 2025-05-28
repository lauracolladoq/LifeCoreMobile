import React from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import CustomText from "./texts/CustomText";

interface ImageInputProps {
  label: string;
  imageUri: string | null;
  onSelectImage: () => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  imageUri,
  onSelectImage,
}) => {
  return (
    <View>
      <CustomText className="mb-2">{label}</CustomText>
      <TouchableOpacity onPress={onSelectImage}>
        <ImageBackground
          source={imageUri ? { uri: imageUri } : undefined}
          style={{
            height: 250,
            borderRadius: 24,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="border-2 border-gray-300 rounded-3xl bg-gray-100"
        >
          {!imageUri && (
            <CustomText className="bg-sky-300 p-3 rounded-full text-sm">Select an image</CustomText>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default ImageInput;