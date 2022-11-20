import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FavoritesScreen} from "../screens/FavoritesScreen"
import { screens } from "../utils"
const Stack = createNativeStackNavigator()

export function FavoritesStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name={screens.favorites.favorites} component={FavoritesScreen} options={{ title: "favoritos"}}/>
        </Stack.Navigator>
    )
}