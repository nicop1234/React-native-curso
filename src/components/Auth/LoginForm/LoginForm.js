/** @format */

import React from "react";
import { View } from "react-native";
import { Button, Text, Input, Icon } from "@rneui/base";
import { styles } from "./loginForm.styles";
import { useState } from "react";
import { useFormik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { screens } from "../../../utils";
import { initialValues, validationSchema } from "./LoginForm.data";
import { useNavigation } from "@react-navigation/native";

export function LoginForm() {
  const [security, setSecurity] = useState(true);
  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      try {
        const auth = getAuth();
         signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screens.account.account);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "error al iniciar sesion",
        });
        console.logo(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='correo electronico'
        containerStyle={styles.input}
        rightIcon={
          <Icon type='material-community' name='at' iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder='contraseña'
        containerStyle={styles.input}
        secureTextEntry={security}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
        rightIcon={
          <Icon
            type='material-community'
            name={security ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => (security ? setSecurity(false) : setSecurity(true))}
          />
        }
      />
      <Button
        containerStyle={styles.btnContain}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Iniciar sesion
      </Button>
    </View>
  );
}
