import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RankingScreen } from "../screens/RankingScreen" 
import { screens } from "../utils"
const Stack = createNativeStackNavigator()

export function RankingStack  (){
    return(
        <Stack.Navigator>
            <Stack.Screen name={screens.ranking.ranking} component={RankingScreen} options={{ title: "ranking"}}/>
        </Stack.Navigator>
    )
}