import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SearchScreen } from "../screens/SearchScreen" 

import { screens } from "../utils"
const Stack = createNativeStackNavigator()

export function SearchStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name={screens.search.search} component={SearchScreen} options={{ title: "buscar"}}/>

            
        </Stack.Navigator>
    )
}