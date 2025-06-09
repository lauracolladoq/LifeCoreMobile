import React, { useState } from "react";
import { View, AppState, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import CustomButton from "../components/common/CustomButton";
import LightText from "@/components/texts/LightText";
import ErrorText from "@/components/texts/ErrorText";
import CustomInput from "@/components/common/CustomInput";
import EmailIcon from "@/assets/icons/email-icon";
import { Link, useRouter } from "expo-router";
import SemiBoldText from "@/components/texts/SemiBoldText";
import ContainerScroll from "@/components/common/ContainerScroll";
import PasswordIcon from "@/assets/icons/password-icon";
import H1 from "@/components/texts/H1";
import { sucessNotification } from "@/utils/showNotification";
import GoogleIcon from "@/assets/icons/oauth/google-icon";
import GitHubIcon from "@/assets/icons/oauth/github-icon";
import FacebookIcon from "@/assets/icons/oauth/facebook-icon";

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
  const { data } = supabase.storage
    .from("profile-picture")
    .getPublicUrl("avatar.png");

  // Validation functions
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateConfirmPassword = (password, confirmPassword) =>
    password === confirmPassword;
  const validateUsername = (username) =>
    username.trim().length >= 3 && username.trim().length <= 15;
  const validateName = (name) =>
    name.trim().length >= 3 && name.trim().length <= 15;
  const validateUsernameUnique = async (username) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username");

      if (error) {
        console.log("Error fetching usernames:", error);
        return false;
      }

      // Convert the data array into a list of usernames
      const usernames = data.map((profile) => profile.username);

      // Check if the provided username already exists
      return !usernames.includes(username);
    } catch (err) {
      console.log("Unexpected error:", err);
      return false;
    }
  };

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

    if (!validateName(name)) {
      setNameError("Name must be between 3 and 15 characters.");
      setLoading(false);
      return;
    }

    if (!validateUsername(username)) {
      setUsernameError("Username must be between 3 and 15 characters.");
      setLoading(false);
      return;
    }

    const isUnique = await validateUsernameUnique(username);
    if (!isUnique) {
      setUsernameError("This username is already taken.");
      setLoading(false);
      return;
    }

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

      sucessNotification("Welcome to Life Core!");
      resetForm();
      router.push("/profile");
    } catch (err) {
      setGeneralError(err.message);
      setLoading(false);
    }
  }

  return (
    <ContainerScroll>
      {/* Register information */}
      <View>
        <H1>Create an account</H1>
        <View className="flex-row">
          <LightText className="mr-2">Already have an account?</LightText>
          <TouchableOpacity
            onPress={() => {
              resetForm();
              router.push("/auth/login");
            }}
            className="flex-row items-center"
          >
            <SemiBoldText className="color-sky-300">Log in</SemiBoldText>
          </TouchableOpacity>
        </View>
      </View>
      {/* Input fields */}
      <View className="gap-3">
        <View>
          <CustomInput
            label="Name"
            onChangeText={setName}
            value={name}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />
          {nameError && <ErrorText>{nameError}</ErrorText>}
        </View>
        <View>
          <CustomInput
            label="Username"
            onChangeText={setUsername}
            value={username}
            placeholder="Enter your username"
            autoCapitalize="none"
          />
          {usernameError && <ErrorText>{usernameError}</ErrorText>}
        </View>
        <View>
          <CustomInput
            label="Email"
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
            autoCapitalize="none"
            icon={<EmailIcon color="#D1D5DB" />}
          />
          {emailError && <ErrorText>{emailError}</ErrorText>}
        </View>
        <View>
          <CustomInput
            label="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Enter your password"
            autoCapitalize="none"
            icon={<PasswordIcon color="#D1D5DB" />}
          />
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </View>
        <View>
          <CustomInput
            label="Confirm Password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholder="Confirm your password"
            autoCapitalize="none"
            icon={<PasswordIcon color="#D1D5DB" />}
          />
          {confirmPasswordError && (
            <ErrorText>{confirmPasswordError}</ErrorText>
          )}
        </View>
      </View>
      {/* Register button */}
      <CustomButton
        title="Register"
        disabled={loading}
        onPress={signUpWithEmail}
      />
      {/* General error message */}
      {generalError ? (
        <View className="items-center">
          {generalError && <ErrorText>{generalError}</ErrorText>}
        </View>
      ) : null}
      {/* Providers */}
      {/* Providers */}
      <LightText className="text-center color-gray-400">
        or register with
      </LightText>
      <View className="flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => router.push("/inProgress")}
          className="bg-white p-3 rounded-full shadow-md"
        >
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/inProgress")}
          className="bg-white p-3 rounded-full shadow-md"
        >
          <GitHubIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/inProgress")}
          className="bg-white p-3 rounded-full shadow-md"
        >
          <FacebookIcon />
        </TouchableOpacity>
      </View>
    </ContainerScroll>
  );
}
