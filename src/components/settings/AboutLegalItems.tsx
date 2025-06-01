import React from "react";
import Item from "@/components/settings/Item";
import { View, ActivityIndicator } from "react-native";
import TermsConditionsIcon from "@/assets/icons/terms-conditions-icon";
import AboutIcon from "@/assets/icons/about-icon";

const AboutLegalItems = () => {
  return (
    <View className="bg-white rounded-3xl p-2 gap-3 items-center justify-between w-full shadow-md">
      <Item
        icon={<AboutIcon />}
        title="About us"
        onPress={() => alert("Go to profile settings")}
        isFirst
      />
      <Item
        icon={<TermsConditionsIcon />}
        title="Terms and Conditions"
        onPress={() => alert("Go to profile settings")}
        isLast
      />
    </View>
  );
};

export default AboutLegalItems;
