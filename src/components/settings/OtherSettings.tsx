import React, { useEffect, useState } from "react";
import Item from "@/components/settings/Item";
import { View, ActivityIndicator } from "react-native";
import NotificationIcon from "@/assets/icons/notification-icon";
import CustomizationIcon from "@/assets/icons/customization-icon";
import { router } from "expo-router";

const OtherSettings = () => {
  return (
    <View className="bg-white rounded-3xl p-2 gap-3 items-center justify-between w-full shadow-md">
      <Item
        icon={<NotificationIcon />}
        title="Notifications"
        onPress={() => router.push("/inProgress")}
        isFirst
      />
      <Item
        icon={<CustomizationIcon />}
        title="Theme"
        onPress={() => router.push("/inProgress")}
        isLast
      />
    </View>
  );
};

export default OtherSettings;
