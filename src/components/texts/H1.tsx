import React from "react";
import { Text, TextProps } from "react-native";

const H1 = ({ style, ...props }: TextProps) => {
  return (
    <Text {...props} style={{ fontFamily: "Nunito-Bold", fontSize: 16 }} />
  );
};

export default H1;
