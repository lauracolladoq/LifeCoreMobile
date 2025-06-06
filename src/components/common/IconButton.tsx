import React from "react";
import { TouchableOpacity, View } from "react-native";

type IconButtonProps = {
  icon?: JSX.Element;
  onPress: () => void;
  disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
        {icon && <View>{icon}</View>}
    </TouchableOpacity>
  );
};

export default IconButton;
