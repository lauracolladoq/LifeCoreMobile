import React from "react";
import { Text, TextProps } from "react-native";

const ButtonText = ({ style, ...props }: TextProps) => {
  return <Text {...props} className="color-white font-bold" style={{ fontFamily: "Nunito" }} />;
};

export default ButtonText;