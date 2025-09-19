import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserProvider } from "@/hooks/user-store";
import { MealsProvider } from "@/hooks/meals-store";
import { SettingsProvider } from "@/hooks/settings-store";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Atrás" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="meal/[id]" 
        options={{ 
          headerShown: true,
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#22c55e',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          headerShown: true,
          title: 'Configuración',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#22c55e',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="privacy-policy" 
        options={{ 
          headerShown: true,
          title: 'Política de Privacidad',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#22c55e',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="terms-of-service" 
        options={{ 
          headerShown: true,
          title: 'Términos de Uso',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#22c55e',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <SettingsProvider>
          <UserProvider>
            <MealsProvider>
              <RootLayoutNav />
            </MealsProvider>
          </UserProvider>
        </SettingsProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
