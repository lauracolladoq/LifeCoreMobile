import React, { useEffect, useState } from "react";
import Item from "@/components/settings/Item";
import { View, ActivityIndicator } from "react-native";
import EmailIcon from "@/assets/icons/email-icon";
import PhoneVerificationIcon from "@/assets/icons/phone-verification-icon";
import ResetPasswordIcon from "@/assets/icons/reset-password-icon";
import PasswordIcon from "@/assets/icons/password-icon";

const SecurityVerificationItems = () => {
  return (
    <View className="bg-white rounded-3xl p-2 gap-3 items-center justify-between w-full shadow-md">
      <Item
        icon={<EmailIcon />}
        title="Verify email address"
        onPress={() => alert("Go to profile settings")}
        isFirst
      />
      <Item
        icon={<PhoneVerificationIcon />}
        title="Phone number verification"
        onPress={() => alert("Go to profile settings")}
      />
      <Item
        icon={<PasswordIcon />}
        title="Change password"
        onPress={() => alert("Go to profile settings")}
      />
      <Item
        icon={<ResetPasswordIcon />}
        title="Password reset"
        onPress={() => alert("Go to profile settings")}
        isLast
      />
    </View>
  );
};

export default SecurityVerificationItems;
