import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import ButtonText from "./texts/ButtonText";

const CustomButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      className="bg-sky-300 p-4 rounded-full items-center"
      onPress={onPress}
    >
      <ButtonText>{title}</ButtonText>
    </TouchableOpacity>
  );
};

export default CustomButton;