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
import { SelectList } from "react-native-dropdown-select-list";

export function InfoGeneral(props) {
  const { route } = props;
  const { email } = getAuth().currentUser;
  const navigation = useNavigation();
  const [ingresoGasto, setIngresoGasto] = useState();
  const [arrayDeTiposIngreso, setArrayDeTiposIngreso] = useState();
  const [arrayDeTiposGasto, setArrayDeTiposGasto] = useState();
  const [arrayDeTiposIngresoSinAñadir, setArrayDeTiposIngresoSinAñadir] =
    useState();
  const [arrayDeTiposGastoSinAñadir, setArrayDeTiposGastoSinAñadir] =
    useState();
  const [fitradoSt, setFiltrado] = useState();
  const [ingreso, setIngreso] = useState();
  const [gasto, setGasto] = useState();
  const [balance, setBalance] = useState();
  const [ingresoSelecto, setIngresoSelecto] = useState();
  const [gastoSelecto, setGastoSelecto] = useState();
  const [arraySoloIngresos, setArraySoloIngresos] = useState();
  const [arraySoloGastos, setArraySoloGastos] = useState();
  const [sumaGastoFilt, setSumaGastoFilt] = useState();
  const [sumaIngresoFilt, setSumaIngresoFilt] = useState();
  useEffect(() => {
    const ref = doc(db, `ingresoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setIngresoGasto(doc.data());
    });
  }, []);

  useEffect(() => {
    const ref = doc(db, `tipoIngreso/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setArrayDeTiposIngreso(doc.data());
    });
  }, []);

  useEffect(() => {
    const ref = doc(db, `tipoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setArrayDeTiposGasto(doc.data());
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

  useEffect(() => {
    const arrayGastoSinAñadir = arrayGasto.filter((thiss) => {
      if (thiss != "+ añadir") return true;
    });
    setArrayDeTiposGastoSinAñadir(arrayGastoSinAñadir);

    const arrayingresoSinAñadir = arrayIngreso.filter((thiss) => {
      if (thiss != "+ añadir") return true;
    });
    setArrayDeTiposIngresoSinAñadir(arrayingresoSinAñadir);
  }, [arrayDeTiposGasto, arrayDeTiposIngreso]);

  useEffect(() => {
    const newGastoSuma = gastoSuma.filter((item) => {
      return item.ingreso == false;
    });
    const newIngresoSuma = gastoSuma.filter((item) => {
      return item.ingreso == true;
    });
    setArraySoloIngresos(newIngresoSuma);
    setArraySoloGastos(newGastoSuma);
  }, [fitradoSt]);

  useEffect(() => {
    let suma = 0;
    const ingresoFiltradoPorTipo = fitradoSt?.filter((item) => {
      if (item.tipo == ingresoSelecto) return true;
    });
    ingresoFiltradoPorTipo?.forEach((item) => {
      let dt = parseInt(item.monto);
      suma = suma + dt;
    });
    setSumaIngresoFilt(suma);
  }, [ingresoSelecto]);


  useEffect(() => {
    let suma = 0;
    const gastoFiltradoPorTipo = fitradoSt?.filter((item) => {
      if (item.tipo == gastoSelecto) return true;
    });
    gastoFiltradoPorTipo?.forEach((item) => {
      let dt = parseInt(item.monto);
      suma = suma + dt;
    });
    setSumaGastoFilt(suma);
  }, [gastoSelecto]);

  const gastoSuma = [];
  const arrayGasto = [];
  const arrayIngreso = [];

  const tableData = [
    [`ingreso total`, `$ ${ingreso}`],
    [`gasto total`, `$ ${gasto}`],
    [`balance`, `$ ${balance}`],
  ];

  const tableData2 = [
    [`ingreso en ${ingresoSelecto}`, `$ ${sumaIngresoFilt}`],
    [`gasto en ${gastoSelecto}`, `$ ${sumaGastoFilt}`],
  ];
  return (
    <View style={styles.content}>
      {!ingresoGasto ? (
        <LoadingModal show text={"cargando"} />
      ) : (
        <View>
          <View style={styles.titleContent}>
            <Text style={styles.title}>Informacion del dia</Text>
          </View>
          <FlatList
            data={arrayDeTiposIngreso?.tipoIngreso}
            renderItem={(doc) => {
              const tipo = doc.item;
              arrayIngreso.push(tipo.value);
            }}
          />
          <FlatList
            data={arrayDeTiposGasto?.tipoGasto}
            renderItem={(doc) => {
              const tipo = doc.item;
              arrayGasto.push(tipo.value);
            }}
          />
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

              arraySoloGastos.forEach((element) => {
                let dt = parseInt(element.monto);
                sumaGasto = sumaGasto + dt;
              });
              setGasto(sumaGasto);
              arraySoloIngresos.forEach((element) => {
                let dt2 = parseInt(element.monto);
                sumaIngreso = sumaIngreso + dt2;
              });
              setIngreso(sumaIngreso);
              setBalance(sumaIngreso - sumaGasto);
            }}></FlatList>

          <View style={styles.medio}>
            <Table>
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
          </View>
          <View style={styles.contentSubTitle}>
            <Text style={styles.subTitle}>
              filtrar gasto o ingreso por su tipo
            </Text>
          </View>

          <View style={styles.contentListFathe}>
            <View style={styles.contentList}>
              <SelectList
                boxStyles={styles.list}
                inputStyles={styles.list2}
                setSelected={setIngresoSelecto}
                data={arrayDeTiposIngresoSinAñadir}
                save='value'
                placeholder='ingreso'
              />
            </View>
            <View style={styles.contentList}>
              <SelectList
                boxStyles={styles.listOther}
                inputStyles={styles.list2}
                setSelected={setGastoSelecto}
                data={arrayDeTiposGastoSinAñadir}
                save='value'
                placeholder='gasto'
              />
            </View>
          </View>
          <View style={styles.medio}>
            <Table>
              <Rows data={tableData2} textStyle={styles.text2} />
            </Table>
          </View>
        </View>
      )}
    </View>
  );
}
