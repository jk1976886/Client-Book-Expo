import {StyleSheet, Pressable, View, Text, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../hooks/useApi";
import {UserContext} from "../../hooks/useUser";
import {useLocalSearchParams} from "expo-router";
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import TextInput from "../UI/TextInput";

export default function ClientPage() {
  
  // Instance Variables
  
  const {api} = useContext(ApiContext);
  const {user, signIn, signOut, signUp} = useContext(UserContext);
  
  const {id} = useLocalSearchParams();
  
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [client, setClient] = useState(null)
  const [wechat, setWechat] = useState('')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  
  // Methods
  
  useEffect(() => {
    return () => {
      setClient(null);
    }
  }, []);
  
  useEffect(() => {
    if(id){
      setLoading(true);
      setEditing(false);
      api.showClient(id).then((newResult) => {
        setLoading(false);
        setClient(newResult.data);
      }, (newError) => {
        setLoading(false);
        
      })
    }
  }, [id]);
  
  useEffect(() => {
    if(client){
      setEmail(client.email);
      setPhone(client.phone);
      setWechat(client.wechat);
      setLastName(client.firstName);
      setFirstName(client.lastName);
    }
  }, [client]);
  
  useEffect(() => {
    if(editing){
      api.updateClient(id, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        wechat: wechat,
      }).then((newResult) => {
      }, (newError) => {
      })
    }
  }, [firstName, lastName, email, phone, wechat]);
  
  // Effects
  
  // Render
  
  return (
    <View style={styles.outerContainer}>
      {loading ?
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large"/>
        </View>
        :
        client ?
          <View>
            <Pressable onPress={() => setEditing(!editing)}>
              <MaterialIcon style={{height: 24,
                              width: 24,
                              marginVertical: 8,
                              marginHorizontal: 13,
                            }}
                            name={editing ? 'check' : 'edit'}
                            size={24}/>
            </Pressable>
            
            <View style={{width:'100%', flexDirection:'row', overflow:'auto', flexWrap:'wrap'}}>
              <TextInput style={styles.textInput}
                         inputStyle={styles.input}
                         label={'First Name'}
                         value={firstName}
                         editable={editing}
                         onChangeText={setFirstName}
              />
              
              <TextInput style={styles.textInput}
                         inputStyle={styles.input}
                         label={'Last Name'}
                         value={lastName}
                         editable={editing}
                         onChangeText={setLastName}
              />
              
              <TextInput style={styles.textInput}
                         inputStyle={styles.input}
                         label={'Email'}
                         value={email}
                         editable={editing}
                         onChangeText={setEmail}
              />
              
              <TextInput style={styles.textInput}
                         inputStyle={styles.input}
                         label={'Phone'}
                         value={phone}
                         editable={editing}
                         onChangeText={setPhone}
              />
              
              <TextInput style={styles.textInput}
                         inputStyle={styles.input}
                         label={'Wechat'}
                         value={wechat}
                         editable={editing}
                         onChangeText={setWechat}
              />
            </View>
          </View>
          :
          <View>
            <Text>
              No Client Selected
            </Text>
          </View>
      }
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
  textInput:{
    margin:10,
    width:'40%'
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
  },
  loadingContainer:{
    width:'100%',
    height:'100%',
    alignItems:"center",
    justifyContent:"center"
  }
});
