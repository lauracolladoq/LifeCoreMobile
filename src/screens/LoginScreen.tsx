import React, { useEffect, useState } from "react";
import { View, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import CustomButton from "../components/common/CustomButton";
import LightText from "@/components/texts/LightText";
import ErrorText from "@/components/texts/ErrorText";
import Container from "@/components/common/Container";
import CustomInput from "@/components/common/CustomInput";
import EmailIcon from "@/assets/icons/email-icon";
import LockIcon from "@/assets/icons/password-icon";
import { Link, useRouter } from "expo-router";
import BoldText from "@/components/texts/BoldText";
import SemiBoldText from "@/components/texts/SemiBoldText";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const router = useRouter();

  // Validation functions
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setGeneralError("");
  };

  async function signInWithEmail() {
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

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

    // If the email and password are valid, proceed with sign-in
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setGeneralError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    resetForm();
    router.push("/home");
  }

  return (
    <Container className="flex-1 justify-start gap-9">
      {/* Login information */}
      <View>
        <BoldText className="text-xl">Sign in to your account</BoldText>
        <View className="flex-row">
          <LightText className="mr-2">Don't have an account yet?</LightText>
          <Link href="/auth/register">
            <SemiBoldText className="color-sky-300">Register</SemiBoldText>
          </Link>
        </View>
      </View>
      {/* Input fields */}
      <View className="gap-3">
        <View>
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
        <View>
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
      {/* Login button */}
      <CustomButton
        title="Log in"
        disabled={loading}
        onPress={() => signInWithEmail()}
      />
      {/* General error message */}
      {generalError ? (
        <View className="items-center">
          {generalError && <ErrorText>{generalError}</ErrorText>}
        </View>
      ) : null}
      {/* Providers */}
      <LightText className="text-center color-gray-400">
        or continue with
      </LightText>
    </Container>
  );
}
