/** @format */

import React from "react";
import { View } from "react-native";
import { Button, Text, Input, Icon } from "@rneui/base";
import { styles } from "./styles";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import Toast from "react-native-toast-message";
import { db, screens, firebase } from "../../../utils";
import { initialValues, validationSchema } from "./Data";
import { useNavigation } from "@react-navigation/native";
import { getFirestore } from "firebase/firestore";

export function RecuperarScreen() {
  const navigation = useNavigation();
  const auth = getAuth()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      
     getAuth
      .generatePasswordResetLink(formValue.email )
      .then((link) => {
        return sendCustomPasswordResetEmail(formValue.email, link);
      })
      .catch((error) => {
      });

    }
  });

  return (
    <View style={styles.content}>
      <Input
        label='Asegurese que no haya un espacio al final'
        labelStyle={styles.texto}
        placeholder='correo electronico'
        containerStyle={styles.input}
        rightIcon={
          <Icon type='material-community' name='at' iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Button
        containerStyle={styles.btnContain}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}>
        mandar
      </Button>
    </View>
  );
}
