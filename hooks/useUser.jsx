import React, {useContext, useEffect, useState} from "react";
import {createContext} from "react";
import {ApiContext} from "./useApi";
import {dataTypes, getData, setData, userKey} from "../helper/mmkv";

export const UserContext = createContext(null);

export function UserProvider(props) {
  
  const {api} = useContext(ApiContext);
  
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const signIn = (email, password) => {
    return api.signIn({user:{email: email, password: password}}).then((newResult) => {
      console.log("Jacky signIn", newResult)
      setLocalUser(newResult.data);
      return newResult;
    }, (newError) => {
      console.log("Jacky signIn error", newError)
      return newError;
    })
  }
  
  const signOut = () => {
    return api.signOut().then((newResult) => {
      console.log("Jacky signOut", newResult)
      clearLocalUser();
      return newResult;
    }, (newError) => {
      console.log("Jacky signOut error", newError)
      return newError;
    })
  }
  
  const signUp = (email, password) => {
    return api.signUp({user:{email: email, password: password}}).then((newResult) => {
      console.log("Jacky signUp", newResult)
      setLocalUser(newResult.data);
      return newResult;
    }, (newError) => {
      console.log("Jacky signUp error", newError)
      return newError;
    })
  }
  
  const reloadUser = () => {
    api.currentUser().then((newResult) => {
      setLocalUser(newResult.data);
      setLoadingUser(false)
    },(newResult) => {
      clearLocalUser();
      setLoadingUser(false)
    })
  }
  
  const setLocalUser = (aUser) => {
    setUser(aUser);
    setData(userKey, aUser);
  }
  
  const clearLocalUser = () => {
    setUser(null);
    setData(userKey, null);
  }
  
  useEffect(() => {
    const storedUser = getData(userKey, dataTypes.object);
    
    if(storedUser && Object.keys(storedUser).length > 0 && storedUser.id){
      setUser(storedUser);
      setLoadingUser(false)
    }
    // load user from server
    reloadUser();
  }, []);
  
  return <UserContext.Provider value={{user, signIn, signOut, signUp, loadingUser}}>
    {props.children}
  </UserContext.Provider>;
}
