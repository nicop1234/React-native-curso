/** @format */

import { useState, React } from "react";
import { View } from "react-native";
import { Button, Text, Input, Icon } from "@rneui/base";
import { styles } from "./registerForm.styles";
import { ErrorMessage, useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initialValues, validationSchema } from "./RegisterForm.data";
import  Toast  from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../utils";


export function RegisterForm() {
  const [security, setSecurity] = useState(true);
  const [security2, setSecurity2] = useState(true);
  const navigation = useNavigation()


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screens.account.Login)
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1:"error al registrarse, intentelo mas tarde"
        })
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
        label="contraseña mayor a 5 caracteres"
        labelStyle={styles.texto}
        placeholder='contraseña'
        containerStyle={styles.input2}
        secureTextEntry={security}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        rightIcon={
          <Icon
            type='material-community'
            name={security ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => (security ? setSecurity(false) : setSecurity(true))}
          />
        }
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder='confirmar contraseña'
        containerStyle={styles.input}
        secureTextEntry={security2}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
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
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title='crear'
        containerStyle={styles.btnContain}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
