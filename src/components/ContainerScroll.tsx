import React from "react";
import { ScrollView, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children?: React.ReactNode; 
}

const ContainerScroll: React.FC<ContainerProps> = ({ style, children, ...props }) => {
  return (
    <ScrollView
      contentContainerStyle={[{ padding: 20 }, style]}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default ContainerScroll;
