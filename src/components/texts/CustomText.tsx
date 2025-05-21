import React from "react";
import { Text, TextProps } from "react-native";

const CustomText = ({ style, ...props }: TextProps) => {
  return <Text {...props} style={{ fontFamily: "Nunito"}} />;
};

export default CustomText;