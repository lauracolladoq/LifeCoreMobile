import React, { useState } from "react";
import { View, Alert, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import CustomButton from "../components/CustomButton";
import CustomText from "@/components/texts/CustomText";
import ErrorText from "@/components/texts/ErrorText";
import Container from "@/components/Container";
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

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const router = useRouter();
  const { data } = supabase.storage.from('profile-picture').getPublicUrl('avatar.png');

  // Validation functions
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateConfirmPassword = (password, confirmPassword) =>
    password === confirmPassword;
  const validateUsername = (username) => username.trim().length >= 3;
  const validateName = (name) => name.trim().length >= 3;
  // const validateUsernameUnique = async (username) => {
  //   const { data, error } = await supabase
  //     .from("profiles")
  //     .select()
  //     .eq("username", username);
  // };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setName("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setUsernameError("");
    setNameError("");
    setGeneralError("");
  };

  async function signUpWithEmail() {
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setUsernameError("");
    setNameError("");
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
    if (!validateConfirmPassword(password, confirmPassword)) {
      setConfirmPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (!validateUsername(username)) {
      setUsernameError("Username must be at least 3 characters.");
      setLoading(false);
      return;
    }
    if (!validateName(name)) {
      setNameError("Name must be at least 3 characters.");
      setLoading(false);
      return;
    }

    try {
      // Create user in auth.users
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError || !authData.user) {
        setGeneralError(authError?.message || "Failed to create user.");
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      // Create profile in public.profiles after the user has been created in auth
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        name,
        username,
        avatar: data.publicUrl,
      });

      Alert.alert("Success", "Account created successfully!");
      resetForm();
      router.push("/home");
    } catch (err) {
      setGeneralError(err.message);
      setLoading(false);
    }
  }

  return (
    <Container>
      <CustomText className="text-xl font-bold">Create an account</CustomText>
      <View className="flex-row mt-6">
        <CustomText className="mr-2">Already have an account?</CustomText>
        <Link href="/auth/login">
          <CustomText className="color-[#4cb2e5]">Log in</CustomText>
        </Link>
      </View>
      <View className="mt-10">
        <View className="mb-6">
          <CustomInput
            label="Name"
            onChangeText={setName}
            value={name}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />
          {nameError && <ErrorText>{nameError}</ErrorText>}
        </View>
        <View className="mb-6">
          <CustomInput
            label="Username"
            onChangeText={setUsername}
            value={username}
            placeholder="Enter your username"
            autoCapitalize="none"
          />
          {usernameError && <ErrorText>{usernameError}</ErrorText>}
        </View>
        <View className="mb-6">
          <CustomInput
            label="Email"
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
            autoCapitalize="none"
            icon={<EmailIcon />}
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
        </View>
        <View className="mb-6">
          <CustomInput
            label="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Enter your password"
            autoCapitalize="none"
            icon={<LockIcon />}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </View>
        <View className="mb-6">
          <CustomInput
            label="Confirm Password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholder="Confirm your password"
            autoCapitalize="none"
            icon={<LockIcon />}
          />
          {confirmPasswordError && (
            <ErrorText>{confirmPasswordError}</ErrorText>
          )}
        </View>
      </View>
      <View className="mt-10">
        <CustomButton
          title="Register"
          disabled={loading}
          onPress={signUpWithEmail}
        />
      </View>
      {generalError && (
        <CustomText className="text-center mt-4 color-red-500">
          {generalError}
        </CustomText>
      )}
    </Container>
  );
}
