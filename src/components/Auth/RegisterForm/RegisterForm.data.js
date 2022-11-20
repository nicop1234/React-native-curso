/** @format */

import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es coreecto")
      .required("el email es obligatorio"),
    password: Yup.string().required("la contraseña es obligatoria"),
    repeatPassword: Yup.string()
      .required("la contraseña es obligatoria")
      .oneOf([Yup.ref("password")], "las contraseñas tienen que ser iguales"),
  });
}
