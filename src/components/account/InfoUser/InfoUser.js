import React from "react";
import { View } from "react-native";
import { Avatar, Text } from "@rneui/base";
import { getAuth } from "firebase/auth";
import { styles } from "./infoUaer.styles";

export function InfoUser() {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const changeAvatar = () => {
    console.log("cambiando");
  };

  return (
    <View style={styles.content}>
      <Avatar
        size='large'
        rounded
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
        source={{ uri: photoURL }}
      >
        <Avatar.Accessory size={24} onPress={() => changeAvatar()} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anonim"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
