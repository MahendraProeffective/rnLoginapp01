import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Heading, VStack, FormControl, Input, Button, Center, Text } from 'native-base';
import SyncStorage from 'sync-storage';
import { localdev,ec2HostDev } from '../Environments/dev';

// const signup = () => {

// 	return (
// 		<SafeAreaView style={styles.container} >
// 			<Text style={styles.titleText}>Register Here</Text>

// 		</SafeAreaView>
// 	);
// };
const Signup = ({navigation}: {navigation: any}) => {
	const [name,setName] = useState("");
	const [dob,setDob] = useState('');
	const [regStatus,setRegStatus] = useState('');
	const registerUserDetails = async () =>{
		setRegStatus('');
		console.log("registering user details..............................");
		try {
			SyncStorage.remove(`[*]`)
			const userId = SyncStorage.get('MFLuserId')? SyncStorage.get('MFLuserId'):100;
			console.log(userId+"------------------------")
			const response = await fetch(`http://${ec2HostDev}:8080/api/signup/${userId}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: name,
					dob: dob,
					userType:"retail user",
					rewardPoints:'120'
				})
			});
			const result = await response.json();
			if(result.status === 'success'){
				setRegStatus(result.status);
				navigation.navigate('Home');
			}
			console.log(result);
		} catch (error) {
			console.log(error + '========');
		}

		}

	return (
		<Center w="100%">
			<Box safeArea p="0" w="100%" maxW="300" py="90">
				<Heading
					size="lg"
					color="coolGray.800"
					_dark={{
						color: 'warmGray.50'
					}}
					fontWeight="semibold"
				>
					Welcome
				</Heading>
				<Heading
					mt="1"
					color="coolGray.600"
					_dark={{
						color: 'warmGray.200'
					}}
					fontWeight="medium"
					size="xs"
				>
					Fill the details to continue!
				</Heading>
				<VStack space={3} mt="5">
					<FormControl>
						<FormControl.Label>Name</FormControl.Label>
						<Input placeholder='Enter Your Name'
						onChangeText={(text: string) => setName(text)} />
					</FormControl>
					<FormControl>
						<FormControl.Label>Date of Birth</FormControl.Label>
						<Input placeholder='dd/mm/yyyy'
						onChangeText={(text: string) => setDob(text)}  />
					</FormControl>
					<Button mt="2" colorScheme="pink"
					onPress={registerUserDetails}>
						Sign up
					</Button>
					<Text>{regStatus}</Text>
				</VStack>
			</Box>
		</Center>
	);
}
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
	titleText: {
		height: 50,
		color: 'white',
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 10
	}
});

export default Signup;
