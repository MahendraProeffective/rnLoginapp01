/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyFroyo from './Components/MyFroyo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SyncStorage from 'sync-storage';
import Home from './Components/Home';

const App = () => {
	console.log('HI There in App');
	// SyncStorage.init();
	const [uid,setuid]: any = useState();
	const getKey =async () => {
		const userId = await AsyncStorage.getItem('MFLuserId');
		setuid(userId);
		console.log(uid+"-----userId-----------");
	}
	getKey();

	console.log(uid+"sssssssssssssss"+SyncStorage.getAllKeys())
	if(uid > 0){
		return (
			<NavigationContainer>
				<Home />
			</NavigationContainer>
		);
	}
	else{
		return (
			<NavigationContainer>
				<MyFroyo />
			</NavigationContainer>
		);
	}
};
export default App;
