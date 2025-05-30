import React from "react";
import { Text, TextProps } from "react-native";

const BoldText = ({ style, ...props }: TextProps) => {
  return <Text {...props} style={{ fontFamily: "Nunito-Bold"}} />;
};

export default BoldText;