import React from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import LightText from "../texts/LightText";

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
      <LightText className="mb-2">{label}</LightText>
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
            <LightText className="bg-sky-300 p-2 rounded-full text-sm">Select an image</LightText>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default ImageInput;