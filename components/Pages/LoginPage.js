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
      
      <Text style={styles.title}>
        Log In or Sign Up
      </Text>
      
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
      
      <View style={styles.button}>
        <Text onPress={() => signIn(email, password)}>
          Sign In
        </Text>
      </View>
      
      <View style={styles.button}>
        <Text onPress={() => signUp(email, password)}>
          Sign Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    borderColor:'#000000',
    borderWidth: 1,
    minWidth:200,
    marginBottom:20
  },
  title:{
    fontSize:20,
    marginBottom:20
  },
  button:{
    backgroundColor:'#EFEFEF',
    margin:10,
    padding:10
  },
  outerContainer:{
    height:'100%',
    alignItems:"center",
    justifyContent:"center"
  }
});
