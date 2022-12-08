/** @format */

import React from "react";
import { Overlay } from "@rneui/base";
import { styles } from "./modal.styles";
import { View } from "react-native";

export function Modal(props) {
  const { show, close, children } = props
  return (
    <Overlay 
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={close}>
      {children}
    </Overlay>

  );
}
