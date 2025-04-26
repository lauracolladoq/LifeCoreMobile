import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

const RootLayout = () => {
  const [loaded, error] = useFonts({
    'Nunito': require('../assets/fonts/Nunito-VariableFont_wght.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown: false,
      }}/>
    </Stack>
  );
};

export default RootLayout;