import {StyleSheet, View, Text, TextInput as RNTextInput} from 'react-native';
import React from "react";

export default function TextCard({label, style, children, labelStyle}) {
  
  // Instance Variables
  
  // Methods
  
  // Effects
  
  // Render
  
  return (
    <View style={[styles.outerContainer, style]}>
      {label ?
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
        :
        null
      }
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  label:{
    width:'100%',
    color:'#F0F0F0',
    backgroundColor:'#5C5C5C',
  },
  outerContainer:{
    width:'100%',
    backgroundColor:'#EFEFEF',
    alignItems:"center",
    justifyContent:"center",
  }
});
