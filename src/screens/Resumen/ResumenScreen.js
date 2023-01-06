/** @format */

import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { Button, Text } from "@rneui/base";
import { db } from "../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { styles } from "./styles";
import { Resumen } from "../../components/Resumen";
import { StatusBar } from "expo-status-bar";
import { Mensual } from "../../components/mensual/Mensual";

export function ResumenScreen() {
  const [currentUser, setCurrentUser] = useState();
  const navigation = useNavigation();
  const [eleccion, setEleccion] = useState(true);

  const goToaAcount = () => {
    navigation.navigate(screens.account.account, {
      screens: screens.account.account,
    });
  };

  const goToMensualDiario = (eleccion) => {
    if (eleccion == "diario") {
      setEleccion(true);
      navigation.navigate(screens.resumen.resumen, {
        screens: screens.resumen.resumen,
      });
    } else {
      setEleccion(false);
      navigation.navigate(screens.resumen.mensual);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.content}>
        {currentUser ? (
          <>
            <View style={styles.titleCont}>
              <Text style={styles.title}>MiEconomia</Text>
            </View>
            <View style={styles.separacion}>
              <TouchableOpacity onPress={() => goToMensualDiario("diario")}>
                <View style={[styles.Text1, styles.text]}>
                  <Text style={eleccion ? styles.true : styles.nada}>
                    Resumen diario
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => goToMensualDiario("mensual")}>
                <View style={styles.text}>
                  <Text style={eleccion ? styles.nada : styles.true}>
                    Resumen mensual
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {eleccion ? <Resumen /> : <Mensual />}
          </>
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
    </ScrollView>
  );
}
