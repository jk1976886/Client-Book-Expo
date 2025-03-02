import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import {ApiProvider} from "../hooks/useApi";
import {UserProvider} from "../hooks/useUser";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApiProvider>
      <UserProvider>
        {/*<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>*/}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            <Drawer.Screen
              name="(stacks)"
              options={{
                headerShown: false,
                drawerLabel: "Home",
                headerTitle: "Home",
                title: 'Home'
              }}
            />
            
            <Drawer.Screen
              name="setting"
              options={{
                drawerLabel: "Setting",
                headerTitle: "Setting",
                title: "Setting",
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
        {/*</ThemeProvider>*/}
      </UserProvider>
    </ApiProvider>
  );
}
