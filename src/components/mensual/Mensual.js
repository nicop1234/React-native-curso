/** @format */

import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Button, Text, Input } from "@rneui/base";
import { onSnapshot, doc } from "firebase/firestore";
import "react-native-get-random-values";
import { db } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { styles } from "./styles";
import { LoadingModal } from "../../components/shared/loadingModal";
import { Modal } from "../shared/Modal";
import { SelectList } from "react-native-dropdown-select-list";
import { getAuth } from "firebase/auth";
import { DataMens } from "./DataMens/DataMens";

export function Mensual() {
  const [seleccion, setSelected] = useState();
  const [seleccionNum, setSelectedNum] = useState();
  const [ingresoGasto, setIngresoGasto] = useState();
  const [filtrados, setFiltrado] = useState();
  const { email } = getAuth().currentUser;
  const fecha = new Date();
  const mes = fecha.getMonth();
  const ano = fecha.getFullYear();

  const meses = [
    { value: "Enero", mes: 0 },
    { value: "Febrero", mesNum: 1 },
    { value: "Marzo", mesNum: 2 },
    { value: "Abril", mesNum: 3 },
    { value: "Mayo", mesNum: 4 },
    { value: "Junio", mesNum: 5 },
    { value: "Julio", mesNum: 6 },
    { value: "Agosto", mesNum: 7 },
    { value: "Septiembre", mesNum: 8 },
    { value: "Octubre", mesNum: 9 },
    { value: "Noviembre", mesNum: 10 },
    { value: "Diciembre", mesNum: 11 },
  ];

  const pasarANum = () => {
    if (seleccion == "Enero") setSelectedNum(0);
    else if (seleccion == "Febrero") setSelectedNum(1);
    else if (seleccion == "Marzo") setSelectedNum(2);
    else if (seleccion == "Abril") setSelectedNum(3);
    else if (seleccion == "Mayo") setSelectedNum(4);
    else if (seleccion == "Junio") setSelectedNum(5);
    else if (seleccion == "Julio") setSelectedNum(6);
    else if (seleccion == "Agosto") setSelectedNum(7);
    else if (seleccion == "Septiembre") setSelectedNum(8);
    else if (seleccion == "Octubre") setSelectedNum(9);
    else if (seleccion == "Noviembre") setSelectedNum(10);
    else if (seleccion == "Diciembre") setSelectedNum(11);
  };

  useEffect(() => {
    if (mes == 0) setSelected("Enero");
    else if (mes == 1) setSelected("Febrero");
    else if (mes == 2) setSelected("Marzo");
    else if (mes == 3) setSelected("Abril");
    else if (mes == 4) setSelected("Mayo");
    else if (mes == 5) setSelected("Junio");
    else if (mes == 6) setSelected("Julio");
    else if (mes == 7) setSelected("Agosto");
    else if (mes == 8) setSelected("Septiembre");
    else if (mes == 9) setSelected("Octubre");
    else if (mes == 10) setSelected("Noviembre");
    else if (mes == 11) setSelected("Diciembre");
  }, []);

  useEffect(() => {
    const ref = doc(db, `ingresoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setIngresoGasto(doc.data());
    });
  }, [seleccion]);

  useEffect(() => {
    pasarANum();
    const filtrado = ingresoGasto?.IngresoGasto?.filter((item) => {
      if ((item.ano == ano) & (item.mes == seleccionNum)) {
        return true;
      }
    });
    setFiltrado(filtrado);
  }, [ingresoGasto]);

  return (
    <View>
      {!ingresoGasto ? (
        <LoadingModal show text={"cargando"} />
      ) : (
        <View>
          <View style={styles.letras}>
            <Text style={styles.fecha}>Resumen del mes</Text>
            <SelectList
              boxStyles={styles.list}
              inputStyles={styles.list2}
              setSelected={setSelected}
              data={meses}
              save='value'
              placeholder={seleccion}
            />
          </View>
          <DataMens dtbase={filtrados} />
        </View>
      )}
    </View>
  );
}
