import {Image, StyleSheet, Platform, Pressable, View, Text} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useContext, useEffect} from "react";
import {ApiContext} from "@/hooks/useApi";

export default function HomeScreen() {
  
  // Instance Variables

  const axios = require('axios').default;

  const {api} = useContext(ApiContext);
  
  // Methods
  
  const click = () => {
    // api.indexClients(10, 0).then((newResult) => {
    //   console.log("Jacky result", newResult)
    // }, (newError) => {
    //   console.log("Jacky error", newError)
    //
    // })
    
    api.signUp({user:{email: "test1@test.com", password: "Testing123"}}).then((newResult) => {
      console.log("Jacky result", newResult)
    }, (newError) => {
      console.log("Jacky error", newError)

    })
  }
  
  // Effects
  
  useEffect(() => {
    console.log("Jacky HomeScreen 1", api)
    
    click();
    
  }, [api])
  
  // Render
  
  return (
    <View style={styles.outerContainer}>
      <Pressable onPress={click}>
        <View>
          <Text>Jacky test</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer:{
    paddingTop:30
  }
});
