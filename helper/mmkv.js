import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const userKey = 'user;'

export const dataTypes = {
  number:'number',
  object:'object',
  string:'string',
  boolean:'boolean'
};

export const getData = (aKey, aType = dataTypes.string) => {
  let returnValue = undefined;
  
  if(dataTypes[aType] !== undefined){
    if(aType === 'boolean'){
      returnValue = storage.getBoolean(aKey);
    }
    else if(aType === 'number'){
      returnValue = storage.getNumber(aKey);
    }
    else if(aType === 'string'){
      returnValue = storage.getString(aKey);
    }
    else if(aType === 'object'){
      returnValue = storage.getString(aKey);
      
      if(returnValue && returnValue.length > 0){
        returnValue = JSON.parse(returnValue);
      }
    }
  }
  return returnValue;
};


export const setData = (aKey, aData) => {
  if(dataTypes[typeof aData] !== undefined){
    let data = aData;
    
    if(typeof data === 'object'){
      data = JSON.stringify(data);
    }
    storage.set(aKey, data);
  }
};

export const deleteData = (aKey) => {
  storage.delete(aKey);
};
