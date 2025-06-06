import React from "react";
import { Text, TextProps } from "react-native";

const TinyText = ({ style, ...props }: TextProps) => {
  return (
    <Text {...props} style={{ fontFamily: "Nunito-Light", fontSize: 10 }} />
  );
};

export default TinyText;
