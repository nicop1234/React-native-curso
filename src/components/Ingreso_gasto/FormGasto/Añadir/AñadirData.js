/** @format */
import * as Yup from "yup";

export function initialValues() {
  return {
    value: "",
  };
}

export function validationSchema() {
  return Yup.object({
    value: Yup.string().required("El nuevo tipo no puede estar vacio"),

  });
}
