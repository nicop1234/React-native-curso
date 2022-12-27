/** @format */

import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { Button, Text } from "@rneui/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { styles } from "./inicioScreenStyles";

export function InicioScreen() {
  const [currentUser, setCurrentUser] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const goToIngreso = () => {
    navigation.navigate(screens.inicio.ingreso, {
      screens: screens.inicio.ingreso,
    });
  };

  const goToGasto = () => {
    navigation.navigate(screens.inicio.gasto, {
      screens: screens.inicio.gasto,
    });
  };

  const goToaAcount = () => {
    navigation.navigate(screens.account.account, {
      screens: screens.account.account,
    });
  };
  return (
    <View style={styles.content}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>MiEconomia</Text>
      </View>
      {currentUser ? (
        <View>
          <View style={styles.contentbtn}>
            <View style={styles.textCont}>
              <Text style={styles.text}>si desea registrar un ingreso </Text>
            </View>
            <Button
              buttonStyle={styles.btnStyle}
              title='ingreso'
              onPress={() => goToIngreso()}
            />
          </View>
          <View style={styles.contentbtn}>
          <View style={styles.textCont}>
              <Text style={styles.text}>si desea registrar un gasto </Text>
            </View>
            <Button
              buttonStyle={styles.btnStyle2}
              title='gasto'
              onPress={() => goToGasto()}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.description}>
            se necesita iniciar sesion para empezar
          </Text>
          <Button
            title='ir'
            buttonStyle={styles.btnStyle}
            onPress={() => goToaAcount()}
          />
        </View>
      )}
    </View>
  );
}
