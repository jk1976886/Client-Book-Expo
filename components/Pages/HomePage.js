import {Image, StyleSheet, Platform, Pressable, View, Text} from 'react-native';
import {useCallback, useContext, useEffect, useState} from "react";
import {ApiContext} from "../../hooks/useApi";
import {UserContext} from "../../hooks/useUser";
import {router, useNavigation} from "expo-router";
import {FlashList} from "@shopify/flash-list";

export default function Homepage() {
  
  // Instance Variables
  
  const {api} = useContext(ApiContext);
  const {user, signIn, signOut, signUp} = useContext(UserContext);
  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  
  // Methods
  
  const loadItems = useCallback(() => {
    setLoading(true);
    api.indexClients().then((newResult) => {
      setLoading(false);
      console.log("Jacky indexClients result", newResult.data.objects)
      setClients(newResult.data.objects)
    }, (newError) => {
      setLoading(false);
      console.log("Jacky indexClients error", newError)
    })
  }, [api]);
  
  // Effects
  
  useEffect(() => {
    loadItems();
  }, [])
  
  useEffect(() => {
    console.log("Jacky HomePage user changed", user)
  }, [user])
  
  // Render
  
  return (
    <View style={styles.outerContainer}>
      <FlashList
        style={styles.list}
        data={clients}
        refreshing={loading}
        onRefresh={loadItems}
        renderItem={({ item }) => {
          console.log("Jacky item", item)
          return (
            // router.push(`/client/${item.id}`)
            <Pressable onPress={() => router.push(`/client/${item.id}`, { withAnchor: true })}>
              <View style={{borderColor:'black', borderWidth:1}}>
                <Text>{item.firstName}</Text>
                <Text>{item.lastName}</Text>
                <Text>{item.email}</Text>
              </View>
            </Pressable>
            
          )
        }}
        estimatedItemSize={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list:{
  
  },
  outerContainer:{
    // paddingTop:30
    flex:1
  }
});
