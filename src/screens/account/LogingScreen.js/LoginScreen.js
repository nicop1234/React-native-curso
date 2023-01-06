/** @format */

import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Image } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../utils";
import { styles } from "./loginScreen.styles";
import { LoginForm } from "../../../components/Auth";

export function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screens.account.Register, {
      screens: screens.account.Register,
    });
  };

  const goToRecup = () => {
    navigation.navigate(screens.account.Recuperar, {
      screens: screens.account.Recuperar,
    });
  };

  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/flecha2.png")}
        style={styles.img}
      />

      <LoginForm />
      <View style={styles.textRegister}>
        <Text>
          ¿Aún no tienes cuenta?{" "}
          <Text style={styles.btnRegister} onPress={() => goToRegister()}>
            Registrarse
          </Text>
        </Text>
      </View>
    
      {/*       para recuperar contraseña//en proceso
      <TouchableOpacity onPress={() => goToRecup()}>
        <View style={styles.textRegister}>
          <Text style={styles.btnRegister} >
            recuperar contraseña
          </Text>
        </View>
      </TouchableOpacity>
      */}
    </ScrollView>
  );
}
