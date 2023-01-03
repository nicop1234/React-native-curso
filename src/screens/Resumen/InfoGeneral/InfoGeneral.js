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
  //db entera y despues filtrada
  const [ingresoGasto, setIngresoGasto] = useState();
  const [fitradoSt, setFiltrado] = useState();
  //datos que se muestran
  const [ingreso, setIngreso] = useState();
  const [gasto, setGasto] = useState();
  const [balance, setBalance] = useState();
  //seeleccion de selectlist
  const [ingresoSelecto, setIngresoSelecto] = useState(" ");
  const [gastoSelecto, setGastoSelecto] = useState(" ");
  //states con con solo gastos o solo ingresos
  const [arraySoloIngresos, setArraySoloIngresos] = useState();
  const [arraySoloGastos, setArraySoloGastos] = useState();
  //suma por tipo de gasto
  const [sumaGastoFilt, setSumaGastoFilt] = useState();
  const [sumaIngresoFilt, setSumaIngresoFilt] = useState();
  //listas de tipos de gastos o tipos de ingresos
  const [gastoTipoFitrado, setGastoFiltrado]  = useState()
  const [ingresoTipoFitrado, setIngresoFiltrado]  = useState()
  //listas sin filtrar
  const [gastoTipoFitradoNo, setGastoFiltradoNo]  = useState()
  const [ingresoTipoFitradoNo, setIngresoFiltradoNo]  = useState()

  useEffect(() => {
    const ref = doc(db, `ingresoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setIngresoGasto(doc.data());
    });
  }, []);


  useEffect(() => {
    const filtrado = ingresoGasto?.IngresoGasto?.filter((item) => {
      if (route.params.date == `${item.dia}/${item.mes + 1}/${item.ano}`) {
        
        return true;
      }
    });
    setFiltrado(filtrado);
  }, [ingresoGasto]);


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


  useEffect(() => {
    const filtGasto = gastoTipoFitradoNo?.filter(( item, index ) => {
      return gastoTipoFitradoNo.indexOf(item) === index;
    })
    setGastoFiltrado(filtGasto)
    const filtIngreso = ingresoTipoFitradoNo?.filter(( item, index ) => {
      return ingresoTipoFitradoNo.indexOf(item) === index;
    })
    setIngresoFiltrado(filtIngreso)
  }, [gastoTipoFitradoNo, ingresoTipoFitradoNo ])


  useEffect(() => {
    arraySoloIngresos?.forEach((item)=>{
      arrayIngreso.push(item.tipo)
    })
    setIngresoFiltradoNo(arrayIngreso)
    arraySoloGastos?.forEach((item)=>{
      arrayGasto.push(item.tipo)
    })
    setGastoFiltradoNo(arrayGasto)
  }, [arraySoloIngresos, arraySoloGastos])
  
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
                data={ingresoTipoFitrado}
                save='value'
                placeholder='ingreso'
              />
            
            </View>
            <View style={styles.contentList}>
               
              <SelectList
                boxStyles={styles.listOther}
                inputStyles={styles.list2}
                setSelected={setGastoSelecto}
                data={gastoTipoFitrado}
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
