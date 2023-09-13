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
import data from './Components/StoredUserId';
import storedUserId from './Components/StoredUserId';
import ec2HostDev from './Environments/dev';
import SyncStorage from 'sync-storage';
import Home from './Components/Home';
import localStorage from 'react-native-sync-localstorage'

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

	// fetch(`http://${ec2HostDev}:8080/api/getOTP`, {
	// 			method: 'POST',
	// 			headers: {
	// 				Accept: 'application/json',
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				userId: data
	// 			})
	// 		})
	// 			.then((result) => result.text())
	// 			.then((text) => {
	// 				const data = JSON.parse(text);
	// 				console.log(data.status + '     textJson');
	// 			});

	// const getStoredData = async () => {

	// 	let data: any= SyncStorage.get('MFLuserId');
	// 	try {
	// 		const getAsyncStorageData = await AsyncStorage.getItem('MFLuserId').then((val) => {
	// 			// data = JSON.parse(val!);
	// 			console.log(data);
	// 		});
	// 		await fetch(`http://${ec2HostDev}:8080/api/getOTP`, {
	// 			method: 'POST',
	// 			headers: {
	// 				Accept: 'application/json',
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				userId: data
	// 			})
	// 		})
	// 			.then((result) => result.text())
	// 			.then((text) => {
	// 				const data = JSON.parse(text);
	// 				console.log(data.status + '     textJson');
	// 			});

	// 		console.log(data);
	// 		return data;
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };
	// const flag = () =>{
	// 	let r;
	// 	getStoredData().then((res) => {
	// 		r=res;
	// 		console.log(res + '---res');
	// 		return res;
	// 	});
	// 	return r
	// }
	// console.log(flag())


};
// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

export default App;
