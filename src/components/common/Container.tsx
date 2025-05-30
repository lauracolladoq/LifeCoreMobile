import React from "react";
import { View, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ style, children, ...props }) => {
  return (
    <View style={[{ padding: 20 }, style]} {...props}>
      {children}
    </View>
  );
};

export default Container;
