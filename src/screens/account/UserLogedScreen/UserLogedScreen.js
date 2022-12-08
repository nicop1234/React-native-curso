import React, {useState} from 'react'
import { View } from 'react-native'
import { Text, Button, Image } from "@rneui/base";
import { getAuth, signOut} from "firebase/auth"
import { styles } from "./userLogedScreen.styles"
import { InfoUser, AccountOptions } from '../../../components/account';
import {LoadingModal} from "../../../components"
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../utils"



export function UserLogedScreen() {
 const [load, setLoad] = useState(false)
 const [loadText, setLoadText] = useState("")
 const [_, setReload] = useState(false)
 const navigation = useNavigation();


 const onReload = () => setReload((prevState) => !prevState)

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth)
    navigation.navigate(screens.inicio.inicio,{
      screens: screens.inicio.inicio,
  });

  } 
  return (
    <View style={styles.content}>
      <InfoUser setLoad={setLoad} setLoadText={setLoadText}/>
      <AccountOptions onReload={onReload}/>
      <Button onPress={() => (logout())} title="cerrar sesión" buttonStyle={styles.buttonStyle} titleStyle={styles.text}/>
      <LoadingModal show={load} text={loadText}/>
    </View>
  )
}