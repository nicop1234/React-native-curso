/** @format */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ResumenScreen } from "../screens/Resumen";
import { screens } from "../utils";
const Stack = createNativeStackNavigator();

export function ResumenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.resumen.resumen}
        component={ResumenScreen}
        options={{ title: "Resumen" }}
      />
    </Stack.Navigator>
  );
}
