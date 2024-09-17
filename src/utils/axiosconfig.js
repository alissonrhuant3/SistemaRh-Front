import { jwtDecode } from "jwt-decode";
const moment = require("moment");

const getTokenFromLocalStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

export const verifyExpJwtToken = () => {
  const token = localStorage.getItem("token");
  let decoded = "";
  if (token) {
    decoded = jwtDecode(token);
    const decodedDateTime = new Date(decoded.exp * 1000).toLocaleString();
    const dataFormatada = moment(decodedDateTime, "DD/MM/YYYY, HH:mm:ss");
    if (dataFormatada.isBefore(moment())) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    } else {
      return true;
    }
  }
  return "Usuário não logado";
};

export const verifyRole = () => {
  const usuario = localStorage.getItem("user").split(",")[3];
  if(usuario.split(":")[1] === `"gestor"`) return "gestor";
  else if (usuario.split(":")[1] === `"empresa/rh"`) return "empresa/rh";
  else if (usuario.split(":")[1] === `"admin"`) return "admin";
  else if (usuario.split(":")[1] === `"funcionario"`) return "funcionario";
}

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
  },
};
