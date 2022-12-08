/** @format */

import React from "react";
import { View } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import { styles } from "./changeNameStyles";
import { initialVlues, ValidationSchema } from "./Data";

export function ChangeNameForm(props) {
  const { onClose, onReload } = props;

  const formik = useFormik({
    initialValues: initialVlues(),
    validationSchema: ValidationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, { displayName });
        onClose();
        onReload()
      } catch (error) {
        Toast.show({
          type: "error", 
          position: "bottom",
          text1: "error al cambiar el nombre y apellido",
        });
      }
    },
  });
  return (
    <View style={styles.content}>
      <Input
        placeholder='Nombre y Apellidos'
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        onPress={formik.handleSubmit}
        title='cambiar nombres y apellidos'
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContain}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
