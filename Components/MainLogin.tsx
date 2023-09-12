import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ec2HostDev from "../Environments/dev";

const MainLogin = ({navigation}: {navigation: any}) => {
	const LoginButton = () => {
		return (
			<><TouchableOpacity disabled={otpState.OTP == 0} style={styles.loginBtn} onPress={() => {
				console.log(otpState);
				setOtpMessage({ mess: ' ',status:' ' })
				otpChecker(otpState);}} >
				<Text style={styles.loginText}>LOGIN </Text>
			</TouchableOpacity></>
		);
	};
	const OTPSenderButton = () => {
		return (
			<TouchableOpacity
				disabled={MobileNumberState.mobileNumber == ''}
				style={styles.loginBtn}
				onPress={onPressSendOtp}
			>
				<Text style={styles.loginText}>Send OTP </Text>
			</TouchableOpacity>
		);
	};
	const [ MobileNumberState, SetMobileNumberState ] = useState({
		mobileNumber: ''
	});
	const [ otpState, setotpState ] = useState({
		OTP: 0
	});
	const [ userId, setUserId ] = useState(1);
	const [ message, setMessage ] = useState({ mess: ' ' });
	const [ otpMessage, setOtpMessage ] = useState({ mess: ' ',status:' ' });

	const otpSender = async (phoneNumber: any) => {
		// e.preventDefault();
		// let ec2HostDev = ec2HostDev;
		console.log(ec2HostDev + '=============ec2 host');
        setMessage({ mess: ' ' });
		try {
			const response = await fetch(`http://${ec2HostDev}:8080/api/getOTP`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					phoneNumber: MobileNumberState.mobileNumber,
					otp: ''
				})
			});
			const result = await response.json();
			console.log(result);

			setMessage({ mess: result.messages[0] });
			setUserId(result.userId);
			// console.log(message.mess);
		} catch (error) {
			console.log(error + '========');
		}
	};

	const otpChecker = async (otp: any) => {
		console.log(userId);
		// e.preventDefault();
		try {
			setOtpMessage({ mess: ' ',status:' ' });
			const response = await fetch(`http://${ec2HostDev}:8080/api/validateOTP/${userId}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					phoneNumber: MobileNumberState.mobileNumber,
					otp: otpState.OTP
				})
			});
			const result = await response.json();
			// console.log(result.messages[0]);
			setOtpMessage({ mess: result.messages[0],status:result.status });
			console.log(otpMessage.mess + '----------------------------'+JSON.stringify(result));
				if(result.status === 'VALID'){
					navigation.navigate('Home')
				}
				else{
					console.log("else------------")
					// console.log(onPressLogin);

		return <LoginSuccess  />;
				}

		} catch (error) {
			console.log(error + '========');
		}
	};

	function onPressSendOtp() {
		otpSender(MobileNumberState);
		return <OtpSuccess />;
	}
	const OtpSuccess = () => {
		if (message) {
			return <Text>{message.mess}</Text>;
		}
		return <Text>failure----------</Text>;
	};
	const LoginSuccess = () => {
		if (otpMessage.status) {
			return <Text>{otpMessage.mess}</Text>;
		}
		return <Text>failure----------</Text>;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}> My Froyo Land</Text>
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					keyboardType="numeric"
					onChangeText={(text) => SetMobileNumberState({ mobileNumber: text })}
					placeholder="Enter mobile number here"
					placeholderTextColor="#003f5c"
				/>
			</View>
			<OTPSenderButton />
			<OtpSuccess />
			<View style={styles.inputView}>
				<TextInput
					style={styles.inputText}
					keyboardType="numeric"
					onChangeText={(text: any) => setotpState({ OTP: text })}
					secureTextEntry
					accessibilityElementsHidden
					placeholder="Enter OTP here"
					placeholderTextColor="#003f5c"
				/>
			</View>
			<LoginButton />
			<LoginSuccess />
		</View>
	);
};


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

export default MainLogin