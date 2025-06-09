import React from "react";
import Item from "@/components/settings/Item";
import { View } from "react-native";
import TermsConditionsIcon from "@/assets/icons/terms-conditions-icon";
import AboutIcon from "@/assets/icons/about-icon";
import { router } from "expo-router";

const AboutLegalItems = () => {
  return (
    <View className="bg-white rounded-3xl p-2 gap-3 items-center justify-between w-full shadow-md">
      <Item
        icon={<AboutIcon />}
        title="About us"
        onPress={() => router.push("/legal/about")}
        isFirst
      />
      <Item
        icon={<TermsConditionsIcon />}
        title="Terms and Conditions"
        onPress={() => router.push("/legal/terms")}
        isLast
      />
    </View>
  );
};

export default AboutLegalItems;
