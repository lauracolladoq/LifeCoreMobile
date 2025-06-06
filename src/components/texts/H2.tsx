import React from "react";
import { Text, TextProps } from "react-native";

const H2 = ({ style, ...props }: TextProps) => {
  return (
    <Text {...props} style={{ fontFamily: "Nunito-Bold", fontSize: 14 }} />
  );
};

export default H2;
