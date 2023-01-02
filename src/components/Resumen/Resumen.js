/** @format */

import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Button, Text, Input } from "@rneui/base";
import { onSnapshot, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "react-native-get-random-values";
import { db } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { styles } from "./styles";
import { LoadingModal } from "../../components/shared/loadingModal";
import { Modal } from "../shared/Modal";
import { InputFecha } from "./InputFecha/InputFecha";

export function Resumen() {
  const [ingresoGasto, setIngresoGasto] = useState();
  const [fitradoSt, setFiltrado] = useState();
  const [render, setRender] = useState("");
  const [show, setShow] = useState(false);
  const [_, setReload] = useState(false);
  const [date, setFecha] = useState();

  const onCloseOpenModel = () => setShow((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const { email } = getAuth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const ref = doc(db, `ingresoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setIngresoGasto(doc.data());
    });
    setFecha(`${dia}/${mes + 1}/${ano}`);
  }, []);

  useEffect(() => {
    const filtrado = ingresoGasto?.IngresoGasto?.filter((item) => {
      if ((item.ano == ano) & (item.mes == mes) & (item.dia == dia)) {
        return true;
      }
    });
    setFiltrado(filtrado);
  }, [ingresoGasto]);

  useEffect(() => {
    const filtrado2 = ingresoGasto?.IngresoGasto?.filter((item) => {
      if (date == `${item.dia}/${item.mes + 1}/${item.ano}`) {
        return true;
      }
    });
    setFiltrado(filtrado2);
  }, [date]);

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

  const abriModal = () => {
    setRender(
      <InputFecha
        onClose={onCloseOpenModel}
        onReload={onReload}
        cambiarFecha={setFecha}
        fecha={date}
        dia={dia}
        mes={mes}
        ano={ano}
      />
    );
    onCloseOpenModel();
  };

  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const ano = fecha.getFullYear();

  console.log(date);
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
          <View style={styles.letras}>
            <Text style={styles.fecha}>{date}</Text>
            <Button
              buttonStyle={styles.btnStyleFecha}
              onPress={() => abriModal()}
            >
              seleccionar
            </Button>
          </View>
          <Button
            buttonStyle={styles.btnStyle}
            onPress={() => goToInfoGeneral()}
          >
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
                    }
                  >
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
      <Modal show={show} close={() => onCloseOpenModel()}>
        {render}
      </Modal>
    </View>
  );
}
