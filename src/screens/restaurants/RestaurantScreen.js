/** @format */

import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { Button } from "@rneui/base";

export function RestaurantScreen() {
  
  const navigation = useNavigation();
  const goToAddRestaurant = () => {
    navigation.navigate(screens.restaurant.addRestaurantScreen, {
      screens: screens.restaurant.addRestaurantScreen,
    });
  };
  return (
    <View>
      <Text>restaurantes</Text>
      <Button title='Crear restaurante' onPress={() => goToAddRestaurant()} />
    </View>
  );
}
