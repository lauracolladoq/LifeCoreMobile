import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./../../lib/supabase";
import { View, Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import CustomText from "@/components/texts/CustomText";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

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
      <CustomText className="text-xl font-bold">Holaaaaaaaaa</CustomText>
      {session ? (
        <CustomButton
          title="Sign Out"
          onPress={handleSignOut}
          disabled={false}
        />
      ) : (
        <Link href="/auth/login">
          <CustomText className="color-[#4cb2e5]">Log in</CustomText>
        </Link>
      )}
    </View>
  );
};

export default HomeScreen;
