/** @format */

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../utils"
import { View, ScrollView, Text} from "react-native";
import { Button, Image } from "@rneui/base";
import { styles } from "./userGuestScreen.Styles";

export function UsersGuestSceen() {
  const navigation = useNavigation();

  const goToLoggin = () =>{
    navigation.navigate(screens.account.Login, {
      screens: screens.account.Login,
  });
  }
  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require("../../../../assets/img/flecha2.png")}
        style={styles.image}
      />
      <Text style={styles.title}>consultar tu perfil de MiEconomia</Text>
      <Text style={styles.description}>
        Para empezar hay que iniciar sesion
      </Text>

      <View>
        <Button title="iniciar sesion" onPress={() =>(goToLoggin())} buttonStyle={styles.btnStyle}/>
      </View>
    </ScrollView>
  );
}
