import React from 'react'
import { View } from 'react-native'
import { Text, Button, Image } from "@rneui/base";
import { styles } from "./userLogedScreen.styles"
import { InfoUser } from '../../../components/account/InfoUser/InfoUser';


export function UserLogedScreen() {
  return (
    <View style={styles.content}>
      <InfoUser/>
    </View>
  )
}