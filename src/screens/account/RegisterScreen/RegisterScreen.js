/** @format */

import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Text, Image } from "@rneui/base";
import { RegisterForm } from "../../../components/Auth"
import { styles } from "./registerScreen.styles";

export function RegisterScreen() {
  return (
  <ScrollView>
    <Image
    source={require("../../../../assets/img/logo.png")}
    style={styles.img}/>
    <View style={styles.content}>
    <RegisterForm/>
    </View>
  </ScrollView>
)}
