/** @format */

const inicioStack = {
  tab: "inicioTab",
  inicio: "Inicio",
  ingreso:"ingreso",
  gasto:"gasto"
};
const resumenStack = {
  tab: "resumenesTab",
  resumen: "Resumen",
  vistaIndividual: "informacion",
  InfoGeneral: "Informacion del dia",
  mensual: "Informacion del mes"
};

const accountStack = {
  tab: "accountTab",
  account: "account",
  Login: "AddAcount",
  Register: "Register",
  Recuperar:" Recuperar",
};

export const screens = {
  account: accountStack,
  inicio: inicioStack,
  resumen: resumenStack,
};
