/** @format */

import * as Yup from "yup";

export function initialVlues() {
  return {
    password: "",
    newpassword: "",
    repeatNewPassword: "",
  };
}

export function ValidationSchema() {
  return Yup.object({
    password: Yup.string().required("La contraseña es obligatoria"),
    newpassword: Yup.string().required("La contraseña es obligatoria"),
    repeatNewPassword: Yup.string()
      .required("La contraseña es obligatoria")
      .oneOf([
        Yup.ref("newpassword")   
      ],"Las nuevas contraseñas tienen que ser iguales",),
  });
}
