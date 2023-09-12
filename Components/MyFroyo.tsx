import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainLogin from "./MainLogin";
import Home from "./Home";

const Stack = createNativeStackNavigator();
const MyFroyo = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name="MainLogin" component={MainLogin} />
			<Stack.Screen name='Home' component={Home}/>
		</Stack.Navigator>
	);
};
export default MyFroyo