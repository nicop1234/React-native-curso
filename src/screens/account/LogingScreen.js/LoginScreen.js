/** @format */

import React from "react";
import { View, ScrollView } from "react-native";
import {  Text, Image } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../utils";
import { styles } from "./loginScreen.styles";
import { LoginForm } from "../../../components/Auth"

export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screens.account.Register, {
      screens: screens.account.Register,
    });
  };
  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/logo.png")}
        style={styles.img}
      />
      <LoginForm/>
      <View style={styles.textRegister}>
        <Text>¿Aún no tienes cuenta? <Text style={styles.btnRegister} onPress={() => goToRegister()}>Registrarse</Text></Text>
      </View>
      
    </ScrollView>
  );
}
