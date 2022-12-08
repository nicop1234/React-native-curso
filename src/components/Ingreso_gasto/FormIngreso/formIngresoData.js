/** @format */
import * as Yup from "yup";

export function initialValues() {
  return {
    monto: "",
    tipo:"",
  };
}

export function validationSchema() {
  return Yup.object({
    monto: Yup.number().required("El monto no puede estar vacio").positive("no puede ser un numero negativo").integer("solo enteros"),
    tipo: Yup.string(),
  });
}
