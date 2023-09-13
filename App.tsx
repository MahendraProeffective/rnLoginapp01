/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyFroyo from './Components/MyFroyo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from './Components/StoredUserId';
import storedUserId from './Components/StoredUserId';
import ec2HostDev from './Environments/dev';
import SyncStorage from 'sync-storage';

const App = () => {
	console.log("HI There")

	const  getStoredData = async () =>{
		let data: any;
        try{
        const getAsyncStorageData = await AsyncStorage.getItem('MFLuserId').then(val => {
            data = JSON.parse(val!);
			console.log(data)
        } );
		await fetch(`http://${ec2HostDev}:8080/api/getOTP`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId:data,
			})
		}).then(result => result.text()).then(text => {
			const data = JSON.parse(text);
			console.log(data.status+"     textJson")});

        return getAsyncStorageData;
        } catch (e){
            console.log(e);
        }

    }
	const AutoLogin = async () => {
		console.log(ec2HostDev + '=============AutoLogin() with uid'+SyncStorage.get('userId'));
		try {
			console.log(data+"!!!!!!")
			const response = await fetch(`http://${ec2HostDev}:8080/api/getOTP`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId:data,
					otp: ''
				})
			});
			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.log(error + '========');
		}
	};
	// AutoLogin();
	getStoredData();
	return (
		<NavigationContainer>
			<MyFroyo />
		</NavigationContainer>
	);
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

