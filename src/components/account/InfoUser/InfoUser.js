/** @format */

import React, {useState} from "react";
import { View } from "react-native";
import { Avatar, Text } from "@rneui/base";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "./infoUaer.styles";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

export function InfoUser(props) {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const { setLoad, setLoadText } = props;

  const [avatar, setAvatar] = useState(photoURL)

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (result.type != "image") {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "solo se puede subir una imagen",
      });
    } else {
      if (!result.cancelled) uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    setLoad(true);
    setLoadText("actualizando perfil");
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhoto(snapshot.metadata.fullPath);
    });
  };
  const updatePhoto = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });
    setAvatar(imageUrl)
    setLoad(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size='large'
        rounded
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
        source={{ uri: avatar }}>
        <Avatar.Accessory size={24} onPress={() => changeAvatar()} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anonimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
