import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./../../lib/supabase";
import { View, Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import CustomButton from "@/components/common/CustomButton";
import { Link } from "expo-router";
import LightText from "@/components/texts/LightText";

const HomeScreen = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
    } else {
      Alert.alert("Success", "You have been signed out.");
      setSession(null); // Limpiar la sesión local
      // <Link href="/auth/login" replace />;
    }
  };

  return (
    <View>
      <LightText className="text-xl font-bold">Holaaaaaaaaa</LightText>
      {session ? (
        <CustomButton
          title="Sign Out"
          onPress={handleSignOut}
        />
      ) : (
        <Link href="/auth/login">
          <LightText className="color-[#4cb2e5]">Log in</LightText>
        </Link>
      )}
    </View>
  );
};

export default HomeScreen;
