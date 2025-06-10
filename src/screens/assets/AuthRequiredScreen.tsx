import React from "react";
import SemiBoldText from "@/components/texts/SemiBoldText";
import { Link } from "expo-router";
import Container from "@/components/common/Container";
import { View } from "react-native";

const AuthRequiredScreen = () => {
  return (
    <Container className="flex-1 justify-center items-center gap-6">
      <SemiBoldText className="text-center">
        You need to be logged in to access this page. Please log in or create an
        account to continue.
      </SemiBoldText>
      <View className="flex-row gap-12">
        <Link
          href="/auth/login"
          className="bg-sky-300 p-2 rounded-full items-center text-center w-1/3"
        >
          <SemiBoldText className="text-white">Log In</SemiBoldText>
        </Link>
        <Link
          href="/auth/register"
          className="bg-sky-300 p-2 rounded-full items-center text-center w-1/3"
        >
          <SemiBoldText className="text-white">Register</SemiBoldText>
        </Link>
      </View>
    </Container>
  );
};

export default AuthRequiredScreen;
