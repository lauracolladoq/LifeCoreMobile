import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import toastConfig from "@/../toastConfig";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    "Nunito-Light": require("../assets/fonts/Nunito-Light.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-Semi-Bold.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      {/* @ts-ignore */}
      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;
