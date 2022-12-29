/** @format */

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button, Image } from "@rneui/base";
import { getAuth, signOut } from "firebase/auth";
import { styles } from "./userLogedScreen.styles";
import { InfoUser, AccountOptions } from "../../../components/account";
import { LoadingModal } from "../../../components";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, screens } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function UserLogedScreen() {
  const [load, setLoad] = useState(false);
  const [loadText, setLoadText] = useState("");
  const [selected, setSelecteds] = useState();
  const [render, setRender] = useState("");
  const [show, setShow] = useState(false);
  const [_, setReload] = useState(false);
  const { email } = getAuth().currentUser;
  const firestore = getFirestore();
  const onCloseOpenModel = () => setShow((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const navigation = useNavigation();


  const fakeDataTipoGasto = [
    { value: "comida", key: 1 },
    { value: "transporte", key: 3 },
    { value: "+ añadir", key: 10000000000 },
  ];

  const buscarDocOrCreate3 = async (idDocumento) => {
    const docRef = doc(firestore, `tipoGasto/${email}`);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
      const consulta = await getDoc(docRef);
      const tipoGasto = consulta.data();
      return tipoGasto.tipoGasto;
    } else {
      await setDoc(docRef, { tipoGasto: [...fakeDataTipoGasto] });
      const consulta = await getDoc(docRef);
      const tipoGasto = consulta.data();
      return tipoGasto.tipoGasto;
    }
  };
  useEffect(() => {
    const fetchTareas = async () => {
      const tarasFetchadas = await buscarDocOrCreate3(email);
    };
    fetchTareas();
  }, []);



  const fakeDataTipoIngreso = [
    { value: "sueldo", key: 1 },
    { value: "+ añadir", key: 10000000000 },
  ];

  const buscarDocOrCreate = async (idDocumento) => {
    const docRef = doc(firestore, `tipoIngreso/${email}`);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
      const consulta = await getDoc(docRef);
      const tipoIngreso = consulta.data();
      return tipoIngreso.tipoIngreso;
    } else {
      await setDoc(docRef, { tipoIngreso: [...fakeDataTipoIngreso] });
      const consulta = await getDoc(docRef);
      const tipoIngreso = consulta.data();
      return tipoIngreso.tipoIngreso;
    }
  };
  useEffect(() => {
    const fetchTareas = async () => {
      const tarasFetchadas = await buscarDocOrCreate(email);
    };
    fetchTareas();
  }, []);



  //para crear documento con ingresos

  const fakeDataIngreso = [];

  const buscarDocOrCreate2 = async (idDocumento) => {
    const docRef = doc(firestore, `ingresoGasto/${email}`);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();

      return infoDocu.tipoIngreso;
    } else {
      await setDoc(docRef, { IngresoGasto: [...fakeDataIngreso] });
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();
      return infoDocu.tipoIngreso;
    }
  };
  useEffect(() => {
    const fetchTareas = async () => {
      const tarasFetchadas = await buscarDocOrCreate2(email);
    };
    fetchTareas();
  }, []);


  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigation.navigate(screens.inicio.inicio, {
      screens: screens.inicio.inicio,
    });
  };
  return (
    <View style={styles.content}>
      <InfoUser setLoad={setLoad} setLoadText={setLoadText} />
      <AccountOptions onReload={onReload} />
      <Button
        onPress={() => logout()}
        title='cerrar sesión'
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.text}
      />
      <LoadingModal show={load} text={loadText} />
    </View>
  );
}
