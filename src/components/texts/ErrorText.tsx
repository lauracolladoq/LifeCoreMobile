import React from "react";
import { Text, TextProps } from "react-native";

const ErrorText = ({ style, ...props }: TextProps) => {
  return (
    <Text
      {...props}
      className="text-red-500 mt-1"
      style={{ fontFamily: "Nunito-SemiBold", fontSize: 10 }}
    />
  );
};

export default ErrorText;
