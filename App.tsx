/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import ec2Host from './Environments/dev';
import {
	Alert,
	Button,
	GestureResponderEvent,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

const loginSuccess = () => {
	return (
		<view>
			<Text>You Logged in successfully</Text>
		</view>
	);
};
const loginFailure = () => {
	return (
		<view>
			<Text>Invalid credentials</Text>
		</view>
	);
};


const App = () => {
	const [ MobileNumberState, SetMobileNumberState ] = useState({
		mobileNumber: ''
	});
	const [ otpState, setotpState ] = useState({
		OTP: 0
	});
	const [ userId,setUserId] = useState(1);
	const [message ,setMessage] = useState({mess:" "});
	const [otpMessage ,setOtpMessage] = useState({mess:" "});
	const otpSender = async (phoneNumber: any) => {
		// e.preventDefault();
		// let ec2Host = ec2Host;
		console.log(ec2Host+"=============ec2 host")
		try {
			const response = await fetch(`http://${ec2Host}:8080/api/getOTP`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"phoneNumber":MobileNumberState.mobileNumber,
				"otp":""
			})
		});
		const result = await response.json();
		console.log(result);
		setMessage({mess:result.messages[0]});
		setUserId(result.userId);
		// console.log(message.mess);
		} catch (error) {
			console.log(error+"========")
		}
	};

	const otpChecker = async (otp: any) => {
		console.log(userId)
		// e.preventDefault();
		try {
			const response = await fetch(`http://${ec2Host}:8080/api/validateOTP/${userId}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"phoneNumber":MobileNumberState.mobileNumber,
				"otp": otpState.OTP
			})
		});
		const result = await response.json();
		// console.log(result.messages[0]);
		setOtpMessage({mess:result.messages[0]});
		console.log(otpMessage.mess+"----------------------------");
		} catch (error) {
			console.log(error+"========")
		}
	};
	function onPressLogin(otp: any) {
		console.log(otpState)
		otpChecker(otpState);
		return(<LoginSuccess/>)
	}

	function onPressSendOtp() {
		otpSender(MobileNumberState);
		return(<OtpSuccess/>)
	}
	const OtpSuccess = () =>{
		if(message){
			return(<Text>
				{message.mess}
			</Text>)
		}
		return(<Text>
			failure----------
		</Text>)

	}
	const LoginSuccess = () =>{
		if(message){
			return(<Text>
				{otpMessage.mess}
			</Text>)
		}
		return(<Text>
			failure----------
		</Text>)

	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}> Login</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					onChangeText={(text) => SetMobileNumberState({ mobileNumber: text })}
					placeholder="Enter mobile number here"
					placeholderTextColor="#003f5c"
				/>
			</View>
			<TouchableOpacity style={styles.loginBtn} onPress={onPressSendOtp}>
				<Text style={styles.loginText}>Send OTP </Text>
			</TouchableOpacity>
			<OtpSuccess/>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					onChangeText={(text: any) => setotpState({ OTP: text })}
					secureTextEntry
					placeholder="Enter OTP here"
					placeholderTextColor="#003f5c"
				/>
			</View>
			<TouchableOpacity style={styles.loginBtn} onPress={onPressLogin}>
				<Text style={styles.loginText}>LOGIN </Text>
			</TouchableOpacity>
			<LoginSuccess/>
		</View>

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

const styles = StyleSheet.create({
	forgotAndSignUpText: {
		color: 'white',
		fontSize: 11
	},
	loginBtn: {
		width: '80%',
		backgroundColor: '#fb5b5a',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 6,
		marginBottom: 10,
		padding: 20
	},
	loginBtn2: {
		width: '50%',
		backgroundColor: '#fb5b5a',
		borderRadius: 25,
		height: 50,
		alignSelf: 'flex-end',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 6,
		marginBottom: 10,
		padding: 20
	},
	container: {
		flex: 1,
		backgroundColor: '#4FD3DA',
		alignItems: 'center',
		justifyContent: 'center'
	},
	Successtitle: {
		fontWeight: 'bold',
		fontSize: 50,
		color: 'lightgreen',
		marginBottom: 40
	},
	title: {
		fontWeight: 'bold',
		fontSize: 50,
		color: '#fb5b5a',
		marginBottom: 40
	},
	inputView: {
		width: '80%',
		backgroundColor: '#3AB4BA',
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20
	},
	inputView2: {
		width: '50%',
		backgroundColor: '#3AB4BA',
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		alignSelf: 'flex-start',
		justifyContent: 'center',
		padding: 20
	},
	inputText: {
		height: 50,
		color: 'white',
		justifyContent: 'center'
	},
	inputText2: {
		height: 50,
		color: 'white',
		justifyContent: 'center'
	},
	loginText: {
		height: 50,
		color: 'white',
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 10
	}
});

export default App;
