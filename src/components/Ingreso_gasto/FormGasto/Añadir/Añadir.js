/** @format */

import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { styles } from "./añadirStyles";
import { ErrorMessage, useFormik } from "formik";
import { initialValues, validationSchema } from "./AñadirData";
import Toast from "react-native-toast-message";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  updateDoc,
  FieldValue,
  arrayUnion
} from "firebase/firestore";
import { db } from "../../../../utils";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../../utils";

export function Añadir(props) {
  const { email } = getAuth().currentUser;

  const {  onClose, onReload } = props;
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        formValue.value, 
        formValue.key = Math.floor(Math.random() * 100000);
        const docRef = doc(db, `tipoGasto/${email}`)
        await updateDoc(docRef, {
          tipoGasto: arrayUnion(formValue)
      });
      onClose();
      onReload();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "error ",
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Nueva opcion'
        onChangeText={(text) => formik.setFieldValue("value", text)}
        errorMessage={formik.errors.value}
      />
      <Button
        onPress={formik.handleSubmit}
        title='aceptar'
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContain}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
