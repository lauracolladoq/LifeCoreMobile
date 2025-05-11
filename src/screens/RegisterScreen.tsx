import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { supabase } from "../lib/supabase";
import CustomButton from "../components/CustomButton";
import CustomText from "@/components/texts/CustomText";
import ErrorText from "@/components/texts/ErrorText";
import Container from "@/components/Container";
import CustomInput from "@/components/CustomInput";
import EmailIcon from "@/assets/icons/email-icon";
import LockIcon from "@/assets/icons/lock-icon";

// email name username password confirmdPAssword
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
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    // if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false);
  }

  return (
    <Container>
      <CustomText className="text-4xl font-bold">
        Create an account
      </CustomText>
      <View className="flex-row mt-8">
        <CustomText className="text-xl font-medium mr-2">
          Don't have an account yet?
        </CustomText>
        <CustomText className="text-xl font-medium color-[#4cb2e5]">
          Register here
        </CustomText>
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
          <ErrorText>Testing </ErrorText>
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
          <ErrorText>Testing </ErrorText>
        </View>
      </View>
      <View className="mt-8">
        <CustomButton
          title="Log in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <CustomText className="text-center mt-16 color-gray-400">
        or continue with
      </CustomText>
      {/* <View style={styles.verticallySpaced}>
        <CustomButton
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View> */}
    </Container>
  );
}
