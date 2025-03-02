import React from "react";
import axios from "axios";
import {createContext} from "react";
import {camelizeKeys, decamelizeKeys} from 'humps';
import {DefaultApi} from '@jacky/client-book-api-client';

const baseUrl = 'http://127.0.0.1:3000'

export const ApiContext = createContext(null);

export function ApiProvider(props) {
  
  const customAxios = customAxiosInstance();
  const api = new DefaultApi({baseOptions:{headers:{'accept':'application/json'}, withCredentials:true}}, baseUrl, customAxios);
  
  console.log("Jacky api 1", baseUrl)
  
  return <ApiContext.Provider value={{api}}>
    {props.children}
  </ApiContext.Provider>;
}

function customAxiosInstance(aError){
  let customAxios = axios.create();
  customAxios.interceptors.request.use((config) => {
    const newConfig = {...config};
    
    if(config.params){
      newConfig.params = decamelizeKeys(config.params);
    }
    if(config.data){
      if(typeof config.data === 'string' || config.data instanceof String){
        newConfig.data = decamelizeKeys(JSON.parse(config.data));
      }
      else{
        newConfig.data = decamelizeKeys(config.data);
      }
    }
    console.log("Jacky newConfig", JSON.stringify(newConfig))
    return newConfig;
  });
  
  customAxios.interceptors.response.use((response) => {
    console.log("Jacky response", response)
    if(response.data && response.headers['content-type'].startsWith('application/json')){
      response.data = camelizeKeys(response.data);
    }
    return response;
  }, (newError) => {
   console.log("Jacky newError", JSON.stringify(newError))
    if(newError && newError.response && newError.response.status === 401 && aError){
      aError(newError);
    }
    return Promise.reject(newError.response);
  });
  return customAxios;
}

