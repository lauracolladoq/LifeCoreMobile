import ArrowIcon from "@/assets/icons/arrow-icon";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import LightText from "../texts/LightText";

interface ItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  isLast?: boolean;
  isFirst?: boolean;
}

const Item: React.FC<ItemProps> = ({
  icon,
  title,
  onPress,
  isLast,
  isFirst,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-3xl flex-row items-center justify-between w-full px-2 pb-2 ${isLast ? "" : "border-b border-gray-100"}
      ${isFirst ? "pt-1" : ""}`}
    >
      <View className="flex-row items-center gap-3">
        <View>{icon}</View>
        <LightText>{title}</LightText>
      </View>
      <ArrowIcon />
    </TouchableOpacity>
  );
};

export default Item;
