import { useState } from "react";
import { Button, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import SyncStorage from "sync-storage"




const Home = ()=>{
    const clearLocalStorage=()=>{
        setFlag('true')
        SyncStorage.remove('MFLuserId');
    }
    const Update = ()=>{

        return (<Text>Storage cleared locally</Text>)
    }
    const [flag, setFlag]:any = useState();
	return(<SafeAreaView>
		<Text>Welcome To MyFroyo Home</Text>
        <Button title="clear Local Storage" onPress={clearLocalStorage}></Button>
        {
            flag?<Update/>:null
        }
	</SafeAreaView>)
}
export default Home