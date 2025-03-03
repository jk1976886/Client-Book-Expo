import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useContext, useEffect} from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import {ApiProvider} from "../hooks/useApi";
import {UserContext, UserProvider} from "../hooks/useUser";
import LoginPage from "../components/Pages/LoginPage";
import {View, Text} from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";

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
        <ProtectedLayout/>
        {/*</ThemeProvider>*/}
      </UserProvider>
    </ApiProvider>
  );
}

const ProtectedLayout = () => {
  const {user, signOut} = useContext(UserContext);
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {user && user.id ?
        <Drawer drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              
              <DrawerItem
                label="Logout"
                onPress={signOut}
              />
            </DrawerContentScrollView>
          );
        }}>
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
          
          <View>
            <Text>
              Jacky test
            </Text>
          </View>
        </Drawer>
        :
        <LoginPage/>
      }
    </GestureHandlerRootView>
  )
}
