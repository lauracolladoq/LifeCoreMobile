import React  from "react";
import { View, TextInput, TextInputProps } from "react-native";
import LightText from "../texts/LightText";

interface CustomInputProps extends TextInputProps {
  label: string;
  icon?: JSX.Element;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  style,
  ...props
}) => {
  return (
    <View>
      <LightText className="mb-2">{label}</LightText>
      <View
        className="flex-row justify-between items-center py-1 px-2 rounded-3xl border-2 border-solid border-gray-300"
        style={[style]}
      >
        <TextInput
          className="flex-1"
          style={{ fontFamily: "Nunito-Light", fontSize: 10 }}
          {...props}
        />
        {icon && <View>{icon}</View>}
      </View>
    </View>
  );
};

export default CustomInput;
