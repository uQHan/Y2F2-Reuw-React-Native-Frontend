import { AuthProvider } from "@/hooks/auth";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot/>
    </AuthProvider>
  );
}

