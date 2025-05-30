import React, { useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import LightText from "../texts/LightText";

interface ContentInputProps extends TextInputProps {
  label: string;
  icon?: JSX.Element;
}

const ContentInput: React.FC<ContentInputProps> = ({
  label,
  icon,
  style,
  ...props
}) => {
  const [height, setHeight] = useState(40);

  return (
    <View>
      <LightText className="mb-2 text-sm">{label}</LightText>
      <View
        className="flex-row justify-between items-center py-2 px-3 rounded-3xl border-2 border-solid border-gray-300"
        style={[style]}
      >
        <TextInput
          multiline
          onContentSizeChange={(e) =>
            setHeight(Math.max(40, e.nativeEvent.contentSize.height))
          }
          className="text-xs flex-1"
          style={{ fontFamily: "Nunito-Light" }}
          {...props}
        />
        {icon && <View>{icon}</View>}
      </View>
    </View>
  );
};

export default ContentInput;
