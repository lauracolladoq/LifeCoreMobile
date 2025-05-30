import React from "react";
import { Text, TextProps } from "react-native";

const SemiBoldText = ({ style, ...props }: TextProps) => {
  return <Text {...props} style={{ fontFamily: "Nunito-SemiBold"}} />;
};

export default SemiBoldText;