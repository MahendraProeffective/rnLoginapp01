import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainLogin from "./MainLogin";
import Home from "./Home";
import Signup from "./Signup";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();
const MyFroyo = () => {
	return (
		<NativeBaseProvider>
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name="MainLogin" component={MainLogin} />
			<Stack.Screen name='Home' component={Home}/>

			<Stack.Screen name='Signup' component={Signup}/>
		</Stack.Navigator>
		</NativeBaseProvider>
	);
};
export default MyFroyo