import React from "react";
import { Text, TextProps } from "react-native";

const ErrorText = ({ style, ...props }: TextProps) => {
  return <Text {...props} className="text-red-500 mt-2" style={{ fontFamily: "Nunito" }} />;
};

export default ErrorText;