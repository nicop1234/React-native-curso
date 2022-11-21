import * as Yup from "yup";

export function initialValues() {
    return {
      email: "",
      password: "",
    };
  }
  
  export function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("No se a ennontrado una cuenta a este mail")
        .required("el email es obligatorio"),
      password: Yup.string().required("la contraseña no es correcta"),
    });
  }
  