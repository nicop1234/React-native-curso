/** @format */

import * as Yup from "yup";

export function initialVlues() {
  return {
    email: "",
    password: "",
  };
}

export function ValidationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("el mail no es valido")
      .required("El nombre y apellido son requeridos"),
    password: Yup.string().required("La contraseña es obligatoria")
  });
}
