import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AccountScreen } from "../screens/account/AccoutntScreen" 
import { LoginScreen } from "../screens/account/LogingScreen.js/LoginScreen"
import { RegisterScreen } from "../screens/account/RegisterScreen/RegisterScreen"
import { screens } from "../utils"
const Stack = createNativeStackNavigator()

export function AccountStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name={screens.account.account} component={AccountScreen} options={{ title: "cuenta"}}/>
            <Stack.Screen name={screens.account.Login} component={LoginScreen} options={{ title: "iniciar sesion"}}/>
            <Stack.Screen name={screens.account.Register} component={RegisterScreen} options={{ title: "crea tu cuenta"}}/>
        </Stack.Navigator>
    )
}