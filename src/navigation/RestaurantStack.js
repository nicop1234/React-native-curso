import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RestaurantScreen } from "../screens/restaurants/RestaurantScreen"
import { AddRestaurantScreen } from "../screens/restaurants/AddRestaurantScreen"
import { screens } from "../utils"
const Stack = createNativeStackNavigator()

export function RestaurantStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name={screens.restaurant.restaurants} component={RestaurantScreen} options={{ title: "Restaurantes"}}/>
            <Stack.Screen name={screens.restaurant.addRestaurantScreen} component={AddRestaurantScreen} options={{ title: "Agregar"}}/>

            
        </Stack.Navigator>
    )
}