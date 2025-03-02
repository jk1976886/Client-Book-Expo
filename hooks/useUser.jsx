import React, {useContext, useState} from "react";
import {createContext} from "react";
import {ApiContext} from "./useApi";

export const UserContext = createContext(null);

export function UserProvider(props) {
  
  const {api} = useContext(ApiContext);
  
  const [user, setUser] = useState(null);
  
  const signIn = (email, password) => {
    return api.signIn({user:{email: email, password: password}}).then((newResult) => {
      console.log("Jacky signIn", newResult)
      setUser(newResult.data);
      return newResult;
    }, (newError) => {
      console.log("Jacky signIn error", newError)
      return newError;
    })
  }
  
  const signOut = () => {
    return api.signOut().then((newResult) => {
      console.log("Jacky signOut", newResult)
      setUser(null);
      return newResult;
    }, (newError) => {
      console.log("Jacky signOut error", newError)
      return newError;
    })
  }
  
  const signUp = (email, password) => {
    return api.signUp({user:{email: email, password: password}}).then((newResult) => {
      console.log("Jacky signUp", newResult)
      setUser(newResult.data);
      return newResult;
    }, (newError) => {
      console.log("Jacky signUp error", newError)
      return newError;
    })
  }
  
  return <UserContext.Provider value={{user, signIn, signOut, signUp}}>
    {props.children}
  </UserContext.Provider>;
}
