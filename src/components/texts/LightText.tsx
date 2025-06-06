import React from "react";
import { Text, TextProps } from "react-native";

const LightText = ({ style, ...props }: TextProps) => {
  return (
    <Text {...props} style={{ fontFamily: "Nunito-Light", fontSize: 12 }} />
  );
};

export default LightText;
