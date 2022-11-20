/** @format */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {AccountStack} from "./AccountStack"
import { RestaurantStack } from "./RestaurantStack";
import {FavoritesStack} from "./FavoritesStack"
import { RankingStack } from "./RankingStack"; 
import { SearchStack } from "./SearchStack"
import { Icon } from "@rneui/base";
import {screens} from "../utils"


const Tab = createBottomTabNavigator();

export function AppNavigations() {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions( route, color, size ),
    
      })}>
      <Tab.Screen name={screens.restaurant.tab} component={RestaurantStack} options={{title: "restaurant"}} />
      <Tab.Screen name={screens.favorites.tab} component={FavoritesStack} options={{title: "favoritos"}}/>
      <Tab.Screen name={screens.ranking.tab} component={RankingStack} options={{title: "ranking"}}/>
      <Tab.Screen name={screens.search.tab} component={SearchStack} options={{title: "search"}}/>
      <Tab.Screen name={screens.account.tab} component={AccountStack} options={{title: "Account"}}/>
     
    </Tab.Navigator>
  );
}

function screenOptions ( route, color, size ){
    let iconName;

    if (route.name === screens.account.tab){
        iconName = "home-outline"
    }
    if (route.name === screens.favorites.tab){
        iconName = "heart-outline"
    }
    if (route.name === screens.ranking.tab){
        iconName = "star-outline"
    }
    if (route.name === screens.restaurant.tab){
      iconName = "compass-outline"
  }
  if (route.name === screens.search.tab){
    iconName = "magnify"
}
    return(
        <Icon type="material-community" name={iconName} color={color} size={size}/>
    )

}
