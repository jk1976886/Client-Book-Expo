import {StyleSheet, View, Text, TextInput as RNTextInput} from 'react-native';
import React from "react";

export default function TextInput({label, style, value, editable, labelStyle, inputStyle, onChangeText}) {
  
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
      <RNTextInput style={[styles.input, inputStyle]}
                   value={value}
                   editable={editable}
                   onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    borderColor:'#000000',
    borderWidth: 1,
    minWidth:200,
    marginBottom:20,
    flex:1,
  },
  label:{
    flex:1,
    marginBottom:5
  },
  outerContainer:{
    flexDirection:'column'
  }
});
