/** @format */

import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Button, Text, Input, Icon, ListItem } from "@rneui/base";
import { onSnapshot, doc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "react-native-get-random-values";
import { db } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { styles } from "./styles";
import { LoadingModal } from "../../components/shared/loadingModal";

export function Resumen() {
  const [ingresoGasto, setIngresoGasto] = useState();
  const [fitradoSt, setFiltrado] = useState();

  const { email } = getAuth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const ref = doc(db, `ingresoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setIngresoGasto(doc.data());
    });
  }, []);

  useEffect(() => {
    const filtrado = ingresoGasto?.IngresoGasto?.filter((item) => {
      if ((item.ano == ano) & (item.mes == mes) & (item.dia == dia)) {
        return true;
      }
    });
    setFiltrado(filtrado);
  }, [ingresoGasto]);

  const goToInfo = (tipo) => {
    navigation.navigate(screens.resumen.vistaIndividual, {
      screens: screens.resumen.vistaIndividual,
      id: tipo.id,
    });
  };

  const goToInfoGeneral = () => {
    navigation.navigate(screens.resumen.InfoGeneral, {
      screens: screens.resumen.InfoGeneral,
      dia: dia,
      mes: mes,
      ano: ano,
    });
  };

  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const ano = fecha.getFullYear();

  return (
    <View>
      {!ingresoGasto ? (
        <LoadingModal show text={"cargando"} />
      ) : (
        <View>
          <FlatList
            data={fitradoSt}
            renderItem={(doc) => {
              fitradoSt.sort(function (a, b) {
                if (a.hora < b.hora) {
                  return 1;
                }
                if (a.hora > b.hora) {
                  return -1;
                }
                return 0;
              });
            }}
          />
          <View>
            <Text style={styles.letras}>
              {dia}/{mes + 1}/{ano}
            </Text>
          </View>
          <Button
            containerStyle={styles.btnContain}
            buttonStyle={styles.btnStyle}
            onPress={() => goToInfoGeneral()}>
            ver info del dia
          </Button>
          <FlatList
            data={fitradoSt}
            renderItem={(doc) => {
              const tipo = doc.item;
              return (
                <TouchableOpacity onPress={() => goToInfo(tipo)}>
                  <View
                    style={
                      tipo.ingreso ? styles.listados : styles.listadosGasto
                    }>
                    <Text style={tipo.ingreso ? styles.title : styles.title2}>
                      {tipo.ingreso ? "INGRESO" : "GASTO"}
                    </Text>
                    <Text>de: ${tipo.monto}</Text>
                    <Text style={styles.monto}>{tipo.tipo}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
