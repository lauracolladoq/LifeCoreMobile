import React from "react";
import { ScrollView, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children?: React.ReactNode; 
}

const ContainerScroll: React.FC<ContainerProps> = ({ style, children, ...props }) => {
  return (
    <ScrollView
      contentContainerStyle={[{ padding: 20, flexGrow: 1, justifyContent:"flex-start" }, style]}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default ContainerScroll;
