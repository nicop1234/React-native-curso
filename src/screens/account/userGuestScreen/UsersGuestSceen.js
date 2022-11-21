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
        source={require("../../../../assets/img/user.png")}
        style={styles.image}
      />
      <Text style={styles.title}>consultar tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type andssds
      </Text>

      <View>
        <Button title="iniciar sesion" onPress={() =>(goToLoggin())} buttonStyle={styles.btnStyle}/>
      </View>
    </ScrollView>
  );
}
