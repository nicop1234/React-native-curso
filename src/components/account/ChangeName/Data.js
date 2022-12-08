import * as Yup from "yup";

export  function initialVlues() {
  return {
    displayName: ""
  }
}


export  function ValidationSchema() {
  return Yup.object({
    displayName: Yup.string().required("El nombre y apellido son requeridos")
  })
}