import {Image, StyleSheet, Platform, Pressable, View, Text} from 'react-native';
import {useContext, useEffect} from "react";
import {ApiContext} from "../../hooks/useApi";
import {UserContext} from "../../hooks/useUser";
import {useNavigation} from "expo-router";

export default function Homepage() {
  
  // Instance Variables
  
  const {api} = useContext(ApiContext);
  const {user, signIn, signOut, signUp} = useContext(UserContext);
  const navigation = useNavigation();
  
  // Methods
  
  const click = () => {
    // api.indexClients(10, 0).then((newResult) => {
    //   console.log("Jacky result", newResult)
    // }, (newError) => {
    //   console.log("Jacky error", newError)
    //
    // })
    
  }
  
  // Effects
  
  useEffect(() => {
    console.log("Jacky HomeScreen 1", api)
  }, [api])
  
  useEffect(() => {
    console.log("Jacky HomePage user changed", user)
  }, [user])
  
  // Render
  
  return (
    <View style={styles.outerContainer}>
      <Pressable onPress={() => signIn('test1@test.com', 'Testing123')}>
        <View>
          <Text>Jacky test</Text>
        </View>
      </Pressable>
      
      <Text onPress={() =>  navigation.openDrawer()}>
        Toggle
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer:{
    // paddingTop:30
  }
});
