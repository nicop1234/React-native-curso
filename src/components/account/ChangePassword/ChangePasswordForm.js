/** @format */

import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input, Icon } from "@rneui/base";
import { useFormik } from "formik";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { initialVlues, ValidationSchema } from "./Data";
import Toast from "react-native-toast-message";
import { styles } from "./changePasswordStyles";

export function ChangePasswordForm(props) {
  const { onClose, onReload } = props;

  const [security, setSecurity] = useState(true);
  const [security2, setSecurity2] = useState(true);
  const [security3, setSecurity3] = useState(true);


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

        await updatePassword(currentUser, formValue.newpassword);
        onClose();
        onReload();
      } catch (error) {
        console.log(error)
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "error al cambiar de contraseña",
        });
      }
    },
    
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Contraseña actual'
        containerStyle={styles.input}
        secureTextEntry={security2}
        rightIcon={
          <Icon
            type='material-community'
            name={security2 ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() =>
              security2 ? setSecurity2(false) : setSecurity2(true)
            }
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
         errorMessage={formik.errors.password}
      />
      <Input
        placeholder='Nueva contraseña'
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
        onChangeText={(text) => formik.setFieldValue("newpassword", text)}
        errorMessage={formik.errors.newpassword}
      />

      <Input
        placeholder='Repite nueva contraseña'
        containerStyle={styles.input}
        secureTextEntry={security3}
        rightIcon={
          <Icon
            type='material-community'
            name={security3 ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => (security3 ? setSecurity3(false) : setSecurity3(true))}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
        errorMessage={formik.errors.repeatNewPassword}
      />

      <Button
        onPress={formik.handleSubmit}
        title='cambiar contraseñas'
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContain}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
