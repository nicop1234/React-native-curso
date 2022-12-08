import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { InicioScreen } from "../screens/Inicio/InicioScreen"
import {  IngresoScreen } from "../screens/Inicio/Ingreso"
import { GastoScreen } from "../screens/Inicio/Gasto"
import { screens } from "../utils"
const Stack = createNativeStackNavigator()

export function InicioStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name={screens.inicio.inicio} component={InicioScreen} options={{ title: "Inicio"}}/>
            <Stack.Screen name={screens.inicio.ingreso} component={IngresoScreen} options={{ title: "ingreso"}}/>
            <Stack.Screen name={screens.inicio.gasto} component={GastoScreen} options={{ title: "gasto"}}/>


        </Stack.Navigator>
    )
}