/** @format */

import React from "react";
import { View } from "react-native";
import { Button, Text, Input, Icon } from "@rneui/base";
import { styles } from "./loginForm.styles";
import { useState } from "react";

export function LoginForm() {
  const [security, setSecurity] = useState(true);
  return (
    <View style={styles.content}>
      <Input
        placeholder='correo electronico'
        containerStyle={styles.input}
        rightIcon={
          <Icon type='material-community' name='at' iconStyle={styles.icon} />
        }
      />
      <Input
        placeholder='contraseña'
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
      />
      <Button containerStyle={styles.btnContain}
        buttonStyle={styles.btnStyle}>Iniciar sesion</Button>
    </View>
  );
}
