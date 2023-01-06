/** @format */

import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Button, Text, Input, Icon } from "@rneui/base";
import { styles } from "../FormIngreso/formIngresoStyles";
import { SelectList } from "react-native-dropdown-select-list";
import { Añadir } from "./Añadir/Añadir";
import { Modal } from "../../shared/Modal";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  deleteField,
  setDoc,
  getFirestore
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./Data";
import Toast from "react-native-toast-message";
import "react-native-get-random-values";
import { db, screens } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuid } from 'uuid'
import 'react-native-get-random-values'

export function FormGasto() {
  const [component, setComponent] = useState(false);
  const [selected, setSelecteds] = useState();
  const [render, setRender] = useState("");
  const [show, setShow] = useState(false);
  const [_, setReload] = useState(false);
  const [arrayDeTipos, setArrayDeTipos] = useState();
  const onReload = () => setReload((prevState) => !prevState);
  const onCloseOpenModel = () => setShow((prevState) => !prevState);
  const navigation = useNavigation();
  const { email } = getAuth().currentUser;
  const firestore = getFirestore();


  const borrarTipo = async () => {
    const array = arrayDeTipos.tipoGasto
    const filtrado = array.filter((item) => {
      return item.value != selected;
    });
    
    const docRef = doc(firestore, `tipoGasto/${email}`);
    await updateDoc(docRef, {
      tipoGasto: deleteField(),
    });
     await setDoc(docRef, { tipoGasto: [...filtrado] });
     Toast.show({
      type: "success",
      position: "bottom",
      text1: "borrado correctamente",
    });
    setComponent(false)
    selected("")
  };

  useEffect(() => {
    const ref = doc(db, `tipoGasto/${email}`);
    const unsub = onSnapshot(ref, (doc) => {
      setArrayDeTipos(doc.data());
    });
  }, []);

  useEffect(() => {
    if (selected == "+ añadir") {
      setRender(<Añadir onClose={onCloseOpenModel} onReload={onReload} setSeleccionado={setSelecteds}/>);
      onCloseOpenModel();
      onReload();
      setComponent(false);
    }
    if (selected == "comida" || selected == "transporte") {
      setComponent(false)
    }
  }, [selected]);

  const tipox = [];

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.getMonth();
        const ano = fecha.getFullYear();
        const hora = fecha.toLocaleTimeString('ar-EG')
        const id = uuid()
        formValue.id = id
        formValue.ingreso = false;
        formValue.monto;
        formValue.tipo = selected;
        formValue.dia = dia;
        formValue.mes = mes;
        formValue.ano = ano;
        formValue.hora= hora;
        const docRef = doc(db, "ingresoGasto", email);
        await updateDoc(docRef, {
          IngresoGasto: arrayUnion(formValue),
        });
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "ingresado correctamente",
        });
        navigation.navigate(screens.inicio.inicio, {
          screens: screens.inicio.inicio,
        });
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "error",
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Gasto</Text>
      <Input
        keyboardType='numeric'
        labelStyle={styles.texto}
        placeholder='Monto'
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type='material-community'
            name='currency-usd'
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue("monto", text)}
        errorMessage={formik.errors.monto}
      />
      <Text style={styles.text}>
        agregar no puede estar en el momento de mandar el monto
      </Text>
      <SelectList
        boxStyles={styles.list}
        inputStyles={styles.list}
        setSelected={setSelecteds}
        data={tipox}
        save='value'
        placeholder='tipo de gasto'
        onSelect={() => setComponent(true)}
      />
      <Button
        containerStyle={styles.btnContain}
        buttonStyle={styles.btnStyle2}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}>
        Mandar
      </Button>
      <Modal
        show={show}
        close={() => onCloseOpenModel()}
        onReload={() => onReload()}>
        {render}
      </Modal>
      <FlatList
        data={arrayDeTipos?.tipoGasto}
        renderItem={(doc) => {
          const tipo = doc.item;
          tipox.push({ key: tipo.key, value: tipo.value });
          tipox.sort(function (a, b) {
            if (a.key > b.key) {
              return 1;
            }
            if (a.key < b.key) {
              return -1;
            }
            return 0;
          });
        }}
      />

      {component ? (
        <Button
          containerStyle={styles.btnContain2}
          buttonStyle={styles.btnStyle2}
          onPress={() => (borrarTipo())}>
          eliminar "{selected}" de tipos
        </Button>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
