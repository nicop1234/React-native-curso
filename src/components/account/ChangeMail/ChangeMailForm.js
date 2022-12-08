/** @format */

import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input, Icon } from "@rneui/base";
import { useFormik } from "formik";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { initialVlues, ValidationSchema } from "./Data";
import Toast from "react-native-toast-message";
import { styles } from "./changeMailStyles";

export function ChangeMailForm(props) {
  const { onClose, onReload } = props;

  const [security, setSecurity] = useState(true);

  const formik = useFormik({
    initialValues: initialVlues(),
    validationSchema: ValidationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );
        reauthenticateWithCredential(currentUser, credentials)

        await updateEmail(currentUser, formValue.email);
        onClose();
        onReload();
      } catch (error) {
        console.log(error)
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "error al cambiar el email",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Nuevo email'
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder='Contraseña'
        containerStyle={styles.input}
        secureTextEntry={security}
        rightIcon={
          <Icon
            type='material-community'
            name={security ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => (security ? setSecurity(false) : setSecurity(true))}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Button
        onPress={formik.handleSubmit}
        title='cambiar email'
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContain}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
