import SuccessIcon from "@/assets/icons/sucess-icon";
import BoldText from "@/components/texts/BoldText";
import SemiBoldText from "@/components/texts/SemiBoldText";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Toast from "react-native-toast-message";

const toastConfig = {
  success: ({ text1 }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 20,
        maxWidth: "75%",
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <SuccessIcon />
      <SemiBoldText style={{ color: "black", textAlign: "center" }}>
        {text1}
      </SemiBoldText>
    </View>
  ),


  confirmation: ({ text1, props }) => {
    const handleYes = () => {
      if (props?.onYes) props.onYes();
      Toast.hide();
    };

    const handleNo = () => {
      if (props?.onNo) props.onNo();
      Toast.hide();
    };

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
          backgroundColor: "#fff",
          borderRadius: 20,
          maxWidth: "75%",
          gap: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {text1 && (
          <BoldText className="text-center">{text1}</BoldText>
        )}
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#7ed321",
              padding: 8,
              borderRadius: 9999,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleYes}
          >
            <SemiBoldText className="color-white">Confirm</SemiBoldText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNo}
            style={{
              backgroundColor: "#ef4444",
              padding: 8,
              borderRadius: 9999,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SemiBoldText className="color-white">Cancel</SemiBoldText>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
};

export default toastConfig;