import React, { useEffect, useState } from "react";
import Item from "@/components/settings/Item";
import { View, ActivityIndicator } from "react-native";
import EmailIcon from "@/assets/icons/email-icon";
import PhoneVerificationIcon from "@/assets/icons/phone-verification-icon";
import ResetPasswordIcon from "@/assets/icons/reset-password-icon";
import PasswordIcon from "@/assets/icons/password-icon";
import { resetPassword, sendVerificationEmail } from "@/lib/securityService";

const SecurityVerificationItems = ({ email }: { email: string }) => {
  return (
    <View className="bg-white rounded-3xl p-2 gap-3 items-center justify-between w-full shadow-md">
      <Item
        icon={<EmailIcon />}
        title="Verify email address"
        onPress={() => sendVerificationEmail(email)}
        isFirst
      />
      <Item
        icon={<ResetPasswordIcon />}
        title="Reset password"
        onPress={() => alert("Go to profile settings")}
        isLast
      />
    </View>
  );
};

export default SecurityVerificationItems;
