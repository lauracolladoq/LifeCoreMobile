import React, { useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import LightText from "../texts/LightText";

interface ContentInputProps extends TextInputProps {
  label: string;
}

const ContentInput: React.FC<ContentInputProps> = ({
  label,
  style,
  ...props
}) => {
  const [height, setHeight] = useState(40);

  return (
    <View>
      <LightText className="mb-2">{label}</LightText>
      <View className="flex-row justify-between items-center py-1 px-2 rounded-3xl border-2 border-solid border-gray-300">
        <TextInput
          multiline
          onContentSizeChange={(e) => {
            const newHeight = e.nativeEvent.contentSize.height;
            setHeight(Math.min(newHeight, 240));
          }}
          className="overflow-auto"
          style={[{ fontFamily: "Nunito-Light", fontSize: 10, height }, style]}
          {...props}
        />
      </View>
    </View>
  );
};

export default ContentInput;
