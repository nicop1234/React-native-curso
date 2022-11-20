/** @format */

import { Overlay } from "@rneui/base";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "./LoadingModal.styles";

export function LoadingModal(props) {
  const { show, text } = props;
  return (
    <Overlay
      isVisible={show}
      windowBackGrounColor='rgba(0,0,0,0.5)'
      overlayStyleBackGroundColor='transparentF'
      overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size='large' color='#00a680' />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}
LoadingModal.defaultProps = {
  show: false,
};
