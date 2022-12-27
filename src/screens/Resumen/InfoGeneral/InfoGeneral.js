/** @format */

import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Button, Text } from "@rneui/base";
import {
  onSnapshot,
  doc,
  updateDoc,
  deleteField,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { db, screens } from "../../../utils";
import { getAuth } from "firebase/auth";
import { LoadingModal } from "../../../components/shared/loadingModal";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Table, Rows } from "react-native-table-component";

export function InfoGeneral(props) {
  const { route } = props;

  const { email } = getAuth().currentUser;
  const navigation = useNavigation();
  const [ingresoGasto, setIngresoGasto] = useState();
  const [fitradoSt, setFiltrado] = useState();
  const [ingreso, setIngreso] = useState();
  const [gasto, setGasto] = useState();
  const [valance, setValance] = useState();

  useEffect(() => {
    const ref = doc(db, `ingresoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setIngresoGasto(doc.data());
    });
  }, []);

  useEffect(() => {
    const filtrado = ingresoGasto?.IngresoGasto?.filter((item) => {
      if (
        (item.ano == route.params.ano) &
        (item.mes == route.params.mes) &
        (item.dia == route.params.dia)
      ) {
        return true;
      }
    });
    setFiltrado(filtrado);
  }, [ingresoGasto]);

  const tableData = [
    [`ingreso`, `$${ingreso}`],
    [`Tgasto`, `$${gasto}`],
    [`valance`, `$${valance}`],
  ];

  const gastoSuma = [];

  return (
    <View style={styles.content}>
      {!ingresoGasto ? (
        <LoadingModal show text={"cargando"} />
      ) : (
        <View>
          <Text>Informacion del dia</Text>
          <FlatList
            data={fitradoSt}
            renderItem={(doc) => {
              const tipo = doc.item;
              let sumaIngreso = 0;
              let sumaGasto = 0;

              gastoSuma.push({
                ingreso: tipo.ingreso,
                monto: tipo.monto,
                tipo: tipo.tipo,
              });
              const newGastoSuma = gastoSuma.filter((item) => {
                return item.ingreso == false;
              });
              const newIngresoSuma = gastoSuma.filter((item) => {
                return item.ingreso == true;
              });

              newGastoSuma.forEach((element) => {
                let dt = parseInt(element.monto);
                sumaGasto = sumaGasto + dt;
              });
              setGasto(sumaGasto);

              newIngresoSuma.forEach((element) => {
                let dt2 = parseInt(element.monto);
                sumaIngreso = sumaIngreso + dt2;
              });
              setIngreso(sumaIngreso);
              setValance(sumaIngreso - sumaGasto);
            }}></FlatList>

          <View style={styles.medio}>
            <Table>
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
          </View>
        </View>
      )}
    </View>
  );
}
