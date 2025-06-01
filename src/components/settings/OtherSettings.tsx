import React, { useEffect, useState } from "react";
import Item from "@/components/settings/Item";
import { View, ActivityIndicator } from "react-native";
import NotificationIcon from "@/assets/icons/notification-icon";
import CustomizationIcon from "@/assets/icons/customization-icon";

const OtherSettings = () => {
  return (
    <View className="bg-white rounded-3xl p-2 gap-3 items-center justify-between w-full shadow-md">
      <Item
        icon={<NotificationIcon />}
        title="Notifications"
        onPress={() => alert("Go to profile settings")}
        isFirst
      />
      <Item
        icon={<CustomizationIcon />}
        title="Theme"
        onPress={() => alert("Go to profile settings")}
        isLast
      />
    </View>
  );
};

export default OtherSettings;
