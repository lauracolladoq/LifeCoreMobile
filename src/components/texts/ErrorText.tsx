import React from "react";
import { Text, TextProps } from "react-native";

const ErrorText = ({ style, ...props }: TextProps) => {
  return <Text {...props} className="text-red-500 text-xs mt-1" style={{ fontFamily: "Nunito-SemiBold" }} />;
};

export default ErrorText;