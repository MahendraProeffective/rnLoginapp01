import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

let data : string | null;
function  storedUserId(): string | null {
    const  getStoredData = async () =>{
        try{
        const getAsyncStorageData =  AsyncStorage.getItem('MFLuserId').then(val => {
            data = val;
        } );
        console.log(data+"!!!!!!")
        return getAsyncStorageData;
        } catch (e){
            console.log(e);
        }
    }
    getStoredData();
    return data;
}

export default storedUserId;