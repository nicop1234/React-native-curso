/** @format */

import React, { useEffect, useState } from "react";
import { View, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { Button, Text } from "@rneui/base";
import { db } from "../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { styles } from "./styles";
import { Resumen } from "../../components/Resumen";

export function ResumenScreen() {
  const [currentUser, setCurrentUser] = useState();
  const navigation = useNavigation();

  const goToaAcount = () => {
    navigation.navigate(screens.account.account, {
      screens: screens.account.account,
    });
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
      <View style={styles.titleCont}>
        <Text style={styles.title}>MiEconomia</Text>
      </View>
      {currentUser ? (
        <Resumen />
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
