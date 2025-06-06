import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import LightText from "../texts/LightText";
import ToggleOffIcon from "@/assets/icons/toggle-off-icon";

interface ToggleItemItemProps {
  icon: React.ReactNode; 
  title: string; 
  onPress?: () => void; 
}

const ToggleItem: React.FC<ToggleItemItemProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-3xl flex-row items-center justify-between w-full pb-2 border-b border-gray-100"
    >
      <View className="flex-row items-center gap-3">
        <View>{icon}</View>
        <LightText>{title}</LightText>
      </View>
      <ToggleOffIcon />
    </TouchableOpacity>
  );
};

export default ToggleItem;