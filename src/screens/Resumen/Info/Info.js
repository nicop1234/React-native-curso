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

export function Info(props) {
  const { route } = props;
  const { email } = getAuth().currentUser;
  const navigation = useNavigation();
  const [ingreso, setIngreso] = useState();
  const [ingreso2, setIngreso2] = useState();
  const firestore = getFirestore();


  useEffect(() => {
    const ref = doc(db, `ingresoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setIngreso(doc.data());
    });
  }, []);

  useEffect(() => {
    const filtrado = ingreso?.IngresoGasto?.filter((item) => {
      return item.id == route.params.id;
    });
    setIngreso2(filtrado);
  }, [ingreso]);

  const borrar = async () => {
    const filtrado2 = ingreso?.IngresoGasto.filter((item) => {
      return item.id != route.params.id;
    });

    const docRef = doc(firestore, `ingresoGasto/${email}`);
    await updateDoc(docRef, {
      IngresoGasto: deleteField(),
    });
    await setDoc(docRef, { IngresoGasto: [...filtrado2] });
    navigation.navigate(screens.resumen.resumen, {
      screens: screens.resumen.resumen,
    });
  };

  return (
    <View style={styles.content}>
       {!ingreso2 ? (
        <LoadingModal show text={"cargando"} />
      ) : (
      <FlatList
        data={ingreso2}
        renderItem={(doc) => {
          const tipo = doc.item;
          const tableData = [
            [
              `Monto del ${tipo.ingreso ? "ingreso:" : "gasto:"}`,
              `$${tipo.monto}`,
            ],
            [
              `Tipo del ${tipo.ingreso ? "ingreso:" : "gasto:"}`,
              `${tipo.tipo}`,
            ],
            [
              `Fecha del ${tipo.ingreso ? "ingreso:" : "gasto:"}`,
              `${tipo.dia}` + `/${tipo.mes + 1}` + `/${tipo.ano}`,
            ],
            [
              `Hora del ${tipo.ingreso ? "ingreso:" : "gasto:"}`,
              `${tipo.hora}`,
            ],
          ];
          return (
            <View>
              <View style={styles.titleContent}>
                <Text style={styles.title}>
                  {tipo.ingreso ? "Detalle del ingreso" : "Detalle del gasto"}
                </Text>
              </View>
              <View style={styles.medio}>
                <Table>
                  <Rows data={tableData} textStyle={styles.text} />
                </Table>
              </View>
              <Button onPress={() => borrar()} buttonStyle={styles.btnStyle}>
                borrar {tipo.ingreso ? "ingreso" : "gasto"}
              </Button>
              <View style={styles.aviso}>
                <Text>
                  si borra el {tipo.ingreso ? "ingreso" : "gasto"} no podra ser
                  recuperado
                </Text>
              </View>
            </View>
          );
        }}
      />
      )}
    </View>
  );
}
