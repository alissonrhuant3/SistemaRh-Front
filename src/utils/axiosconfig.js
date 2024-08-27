import { jwtDecode } from "jwt-decode";
const moment = require("moment");

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
