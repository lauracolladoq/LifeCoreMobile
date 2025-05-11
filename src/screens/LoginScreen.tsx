import React, { useState } from "react";
import { Alert, View, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import CustomButton from "../components/CustomButton";
import CustomText from "@/components/texts/CustomText";
import ErrorText from "@/components/texts/ErrorText";
import Container from "@/components/Container";
import CustomInput from "@/components/CustomInput";
import EmailIcon from "@/assets/icons/email-icon";
import LockIcon from "@/assets/icons/lock-icon";
import { Link } from "expo-router";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  async function signInWithEmail() {
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    // Validaciones
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    // Si las validaciones pasan, intentamos hacer login
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setGeneralError(error.message);
    }

    setLoading(false);
  }

  return (
    <Container>
      <CustomText className="text-4xl font-bold">
        Sign in to your account
      </CustomText>
      <View className="flex-row mt-8">
        <CustomText className="text-xl font-medium mr-2">
          Don't have an account yet?
        </CustomText>
        <Link href="/auth/register">
          <CustomText className="text-xl font-medium color-[#4cb2e5]">
            Register here
          </CustomText>
        </Link>
      </View>
      <View className="mt-16">
        <View className="mb-6">
          <CustomInput
            label="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Enter your email"
            autoCapitalize={"none"}
            icon={<EmailIcon />}
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
        </View>
        <View className="mb-6">
          <CustomInput
            label="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
            autoCapitalize={"none"}
            icon={<LockIcon />}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </View>
      </View>
      <View className="mt-8">
        <CustomButton
          title="Log in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      {generalError && (
        <CustomText className="text-center mt-4 color-red-500">
          {generalError}
        </CustomText>
      )}
      <CustomText className="text-center mt-16 color-gray-400">
        or continue with
      </CustomText>
    </Container>
  );
}
