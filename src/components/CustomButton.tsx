import React from "react";
import { TouchableOpacity } from "react-native";
import SemiBoldText from "./texts/SemiBoldText";

const CustomButton = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      className="bg-sky-300 p-2 rounded-full items-center"
      onPress={onPress}
      disabled={disabled}
    >
      <SemiBoldText className="color-white">{title}</SemiBoldText>
    </TouchableOpacity>
  );
};

export default CustomButton;