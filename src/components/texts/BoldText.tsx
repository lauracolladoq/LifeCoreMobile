import React from "react";
import { Text, TextProps } from "react-native";

const BoldText = ({ style, ...props }: TextProps) => {
  return (
    <Text {...props} style={{ fontFamily: "Nunito-Bold", fontSize: 12 }} />
  );
};

export default BoldText;
