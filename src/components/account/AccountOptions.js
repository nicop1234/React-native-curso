/** @format */

import React, { useState } from "react";
import { View } from "react-native";
import { ListItem, Icon, Text } from "@rneui/base";
import { map } from "lodash";
import { Modal } from "../shared/Modal";
import { ChangeNameForm } from "./ChangeName";
import { ChangeMailForm } from "./ChangeMail"
import { ChangePasswordForm } from "./ChangePassword";


export function AccountOptions(props) {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState("");

  const { onReload } = props;

  const onCloseOpenModel = () => setShow((prevState) => !prevState);

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRender(<ChangeNameForm onClose={onCloseOpenModel} onReload={onReload}/>);
    }
    if (key === "mail") {
      setRender(<ChangeMailForm onClose={onCloseOpenModel} onReload={onReload}/>);
    }
    if (key === "password") {
      setRender(<ChangePasswordForm onClose={onCloseOpenModel} onReload={onReload}/>);
    }

    onCloseOpenModel();
  };

  const menuOptions = menuOption(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <Icon
            type={menu.iconType}
            name={menu.iconName}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.IconColorRight}
          />
        </ListItem>
      ))}
      <Modal show={show} close={() => onCloseOpenModel()}>
        {render}
      </Modal>
    </View>
  );
}

function menuOption(selectedComponent) {
  return [
    {
      title: "cambiar Nombre y Apellido",
      iconType: "material-community",
      iconName: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      IconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "cambiar Email",
      iconType: "material-community",
      iconName: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      IconColorRight: "#ccc",
      onPress: () => selectedComponent("mail"),
    },
    {
      title: "cambiar Contraseña",
      iconType: "material-community",
      iconName: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      IconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];
}
