/** @format */
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Button, Text, Input, Icon } from "@rneui/base";
import { styles } from "./formIngresoStyles";
import { SelectList } from "react-native-dropdown-select-list";
import { Añadir } from "./Añadir/Añadir";
import { Modal } from "../../shared/Modal";
import {
  collection,
  onSnapshot,
  query,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  orderBy,
  where,
  connectFirestoreEmulator,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./formIngresoData";
import Toast from "react-native-toast-message";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../utils";

export function FormIngreso() {
  const [selected, setSelected] = useState("");
  const [render, setRender] = useState("");
  const [show, setShow] = useState(false);
  const [_, setReload] = useState(false);
  const [ingreso, setIngreso] = useState();
  const [arrays, setArrays] = useState();
  const [load, setLoad] = useState(false)


  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const firestore = getFirestore();

  const onReload = () => setReload((prevState) => !prevState);
  const onCloseOpenModel = () => setShow((prevState) => !prevState);

  const press = () => {
    setIngreso(true);
    formik.handleSubmit;
  };

  const fakeData = [
    { value: "sueldo", key: 1 },
    { value: "+ añadir", key: 10000000000 },
  ];

  const buscarDocOrCreate = async (idDocumento) => {
    const docRef = doc(firestore, `tipoIngreso/${email}`);
    const consulta = await getDoc(docRef);
    if (consulta.exists()) {
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();
      const q = query(collection(db, "tipoIngreso"), orderBy("key", "asc"));
      return infoDocu.tipoIngreso;
    } else {
      await setDoc(docRef, { tipoIngreso: [...fakeData] });
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();
      return infoDocu.tipoIngreso;
    }
  };

  useEffect(() => {
    const fetchTareas = async () => {
      const tarasFetchadas = await buscarDocOrCreate(email);
      setArrays(tarasFetchadas);
    };
    fetchTareas();
  }, []);

  useEffect(() => {
    if (selected == "+ añadir") {
      setRender(<Añadir onClose={onCloseOpenModel} onReload={onReload} />);
      onCloseOpenModel();
      onReload()
    }
    setSelected("");
  }, [selected]);

  const tipox = [];

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        formValue.id = uuidv4();
        formValue.ingreso = ingreso;
        formValue.monto;
        formValue.tipo = selected;
        await setDoc(doc(db, "tipoIngreso", formValue.id), formValue);
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
        setSelected={(val) => setSelected(val)}
        data={tipox}
        save='value'
        placeholder='tipo de ingreso'
      />
      <Button
        containerStyle={styles.btnContain}
        buttonStyle={styles.btnStyle}
        onPress={() => press()}
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
        data={arrays}
        renderItem={(doc) => {
          const tipo = doc.item;
          tipox.push({ value: tipo.value });
        }}
      />
    </View>
  );
}
