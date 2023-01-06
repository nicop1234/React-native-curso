import * as Yup from "yup";

export function initialValues() {
    return {
      email: "",
    };
  }
  
  export function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("No se a ennontrado una cuenta a este mail")
        .required("el email es obligatorio"),
    });
  }
  