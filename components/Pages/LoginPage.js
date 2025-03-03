import {Image, StyleSheet, Platform, Pressable, View, Text, TextInput} from 'react-native';
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../hooks/useApi";
import {UserContext} from "../../hooks/useUser";
import {useNavigation} from "expo-router";

export default function LoginPage() {
  
  // Instance Variables
  
  const {api} = useContext(ApiContext);
  const {user, signIn, signOut, signUp} = useContext(UserContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Methods
  
  // Effects
  
  // Render
  
  return (
    <View style={styles.outerContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      
      <Text onPress={() => signIn(email, password)}>
        Sign In
      </Text>
      
      <Text onPress={() => signUp(email, password)}>
        Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer:{
    // paddingTop:30
  }
});
