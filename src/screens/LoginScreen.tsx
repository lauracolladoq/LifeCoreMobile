import React, { useState } from "react";
import { View, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import CustomButton from "../components/CustomButton";
import CustomText from "@/components/texts/CustomText";
import ErrorText from "@/components/texts/ErrorText";
import Container from "@/components/ContainerScroll";
import CustomInput from "@/components/CustomInput";
import EmailIcon from "@/assets/icons/email-icon";
import LockIcon from "@/assets/icons/lock-icon";
import { Link, useRouter } from "expo-router";

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
    }

    setLoading(false);
    resetForm();
    router.push("/home");
  }

  return (
    <Container>
      <CustomText className="text-xl font-bold">
        Sign in to your account
      </CustomText>
      <View className="flex-row mt-6">
        <CustomText className="mr-2">Don't have an account yet?</CustomText>
        <Link href="/auth/register">
          <CustomText className="color-[#4cb2e5]">Register</CustomText>
        </Link>
      </View>
      <View className="mt-10">
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
      <View className="mt-10">
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
      <CustomText className="text-center mt-10 color-gray-400">
        or continue with
      </CustomText>
    </Container>
  );
}
