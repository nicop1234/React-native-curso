/** @format */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ResumenScreen } from "../screens/Resumen";
import { screens } from "../utils";
import { Info } from "../screens/Resumen/Info/Index"
import { InfoGeneral } from "../screens/Resumen/InfoGeneral";

const Stack = createNativeStackNavigator();

export function ResumenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.resumen.resumen}
        component={ResumenScreen}
        options={{ title: "Resumen" }}
      />
      <Stack.Screen
        name={screens.resumen.vistaIndividual}
        component={Info}
        options={{ title: "info" }}
      />
      <Stack.Screen
        name={screens.resumen.InfoGeneral}
        component={InfoGeneral}
        options={{ title: "informacion del dia" }}
      />
    </Stack.Navigator>
  );
}
