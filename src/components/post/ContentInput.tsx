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
      <LightText className="mb-2 text-sm">{label}</LightText>
      <View className="flex-row justify-between items-center py-2 px-3 rounded-3xl border-2 border-solid border-gray-300">
        <TextInput
          multiline
          onContentSizeChange={(e) => {
            const newHeight = e.nativeEvent.contentSize.height;
            setHeight(Math.min(newHeight, 240));
          }}
          className="text-xs overflow-auto"
          style={[
            { fontFamily: "Nunito-Light", height }, 
            style,
          ]}
          {...props}
        />
      </View>
    </View>
  );
};

export default ContentInput;