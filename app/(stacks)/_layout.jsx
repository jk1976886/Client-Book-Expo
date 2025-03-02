import {Stack, useNavigation} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import {Platform} from "react-native";
import { PlatformPressable } from '@react-navigation/elements';
import {DrawerActions} from "@react-navigation/native";
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const StacksLayout = () => {
  const nav = useNavigation();
  return (
    
    <Stack
      screenOptions={({navigation}) => ({
        headerLeft: () => {
          return (
            <PlatformPressable
              android_ripple={{ borderless: true }}
              style={{
                // Roundness for iPad hover effect
                borderRadius: 10,
              }}
              onPressIn={() => {
                console.log("Jacky pressed 1")
                navigation.dispatch(DrawerActions.openDrawer());
                console.log("Jacky pressed 2")
              }}
              hitSlop={Platform.select({
                ios: undefined,
                default: { top: 16, right: 16, bottom: 16, left: 16 },
              })}>
              <MaterialIcon style={{
                              height: 24,
                              width: 24,
                              marginVertical: 8,
                              marginHorizontal: 13,
                            }}
                            name="menu"
                            size={24}/>
            </PlatformPressable>
          );
        },
      })}>
      <Stack.Screen
        name="index"
        options={{
          headerShown:true,
          headerTitle: "Stack Home"
        }}
      />
    </Stack>
  );
};

export default StacksLayout;
