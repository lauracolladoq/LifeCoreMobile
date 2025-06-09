import React from "react";
import Item from "@/components/settings/Item";
import { View } from "react-native";
import EmailIcon from "@/assets/icons/email-icon";
import ResetPasswordIcon from "@/assets/icons/reset-password-icon";
import { sendVerificationEmail } from "@/lib/securityService";
import { router } from "expo-router";

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
        onPress={() => router.push("/inProgress")}
        isLast
      />
    </View>
  );
};

export default SecurityVerificationItems;
