import React from "react";
import { View, Image, Linking } from "react-native";
import ContainerScroll from "@/components/common/ContainerScroll";
import BoldText from "@/components/texts/BoldText";
import LightText from "@/components/texts/LightText";
import H1 from "@/components/texts/H1";

const AboutUsScreen = () => {
  return (
    <ContainerScroll>
      <H1 className="text-center">About Us</H1>

      <View className="gap-2">
        <LightText>
          Welcome to Life Core, a social media platform designed to connect
          people, share ideas, and build communities. Our mission is to provide
          a safe, engaging, and inclusive space for everyone.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>Our Vision</BoldText>
        <LightText>
          We aim to foster meaningful interactions and empower users to express
          themselves freely while respecting others.
        </LightText>
      </View>

      <View className="gap-1">
        <BoldText>Contact Us</BoldText>
        <LightText>
          For questions, support, or feedback, please reach out at:{' '}
          <LightText
            className="text-sky-300"
            onPress={() => Linking.openURL("https://github.com/lauracolladoq")}
          >
            @lauracolladoq
          </LightText>
        </LightText>
      </View>

      <View style={{ alignItems: "center" }}>
        <Image
          source={require("@/assets/creative_commons.png")}
          style={{ width: 220, height: 80 }}
        />
      </View>

      <LightText className="text-center">
        © {new Date().getFullYear()} Life Core. All rights reserved.
      </LightText>
    </ContainerScroll>
  );
};

export default AboutUsScreen;
