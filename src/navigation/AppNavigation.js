/** @format */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountStack } from "./AccountStack";
import { InicioStack } from "./InicioStack";
import { ResumenStack } from "./ResumenStack";
import { Icon } from "@rneui/base";
import { screens } from "../utils";

const Tab = createBottomTabNavigator();


export function AppNavigations() {
  return (
    <Tab.Navigator
       screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF2C00",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}>
      <Tab.Screen
        name={screens.resumen.tab}
        component={ResumenStack}
        options={{ title: "Resumen" }}
      />
      <Tab.Screen
        name={screens.inicio.tab}
        component={InicioStack}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen
        name={screens.account.tab}
        component={AccountStack}
        options={{ title: "Cuenta" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screens.account.tab) {
    iconName = "account-circle-outline";
  }
  if (route.name === screens.resumen.tab) {
    iconName = "book-outline";
  }
  if (route.name === screens.inicio.tab) {
    iconName = "home-outline";
  }

  return (
    <Icon type='material-community' name={iconName} color={color} size={size} />
  );
}
