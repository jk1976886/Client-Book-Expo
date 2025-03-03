import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useContext, useEffect} from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import {ApiProvider} from "../hooks/useApi";
import {UserContext, UserProvider} from "../hooks/useUser";
import LoginPage from "../components/Pages/LoginPage";
import {View, Text, ActivityIndicator} from "react-native";
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
  const {user, signOut, loadingUser} = useContext(UserContext);
  
  useEffect(() => {
    if(!loadingUser && user && user.id){
      SplashScreen.hide();
    }
  }, [user, loadingUser])
  
  if (loadingUser) {
    return <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
      {/*TODO Jacky make splash screen prettier*/}
      <ActivityIndicator size="large"/>
    </View>;
  }
  
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
            name="index"
            options={{
              drawerLabel: "Home",
              headerTitle: "Home",
              title: 'Home'
            }}
          />
          
          <Drawer.Screen
            name="client/[id]"
            options={{
              drawerItemStyle: {display: 'none', width:0, height:0},
              headerTitle: "Client Info",
              title: 'Client Info'
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
