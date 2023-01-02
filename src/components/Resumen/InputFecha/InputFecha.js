/** @format */

import React,{useState} from "react";
import { View } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import { styles } from "../../account/ChangeName/changeNameStyles";

export function InputFecha(props) {
  const { onClose, onReload, cambiarFecha, dia, mes, ano} = props;
  const [ variable, setVariable] = useState()

  const mandar = () => {
    onClose();
    onReload();
    cambiarFecha(variable)
  };

  const mandar2 = () => {
    onClose();
    onReload();
    cambiarFecha(`${dia}/${mes + 1}/${ano}`)
  };
  return (
    <View style={styles.content}>
      <Input
        placeholder='dia/mes/año'
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={setVariable}
      />
      <Button
        title='poner nueva fecha'
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContain}
        onPress={() => mandar()}
      />
    <Button
        title='poner fecha de hoy'
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContain2}
        onPress={() => mandar2()}
      />
    </View>
  );
}
