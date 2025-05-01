import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children?: React.ReactNode; 
}

const Container: React.FC<ContainerProps> = ({ style, children, ...props }) => {
  return (
    <View className="p-8" {...props}>
      {children}
    </View>
  );
};

export default Container;
