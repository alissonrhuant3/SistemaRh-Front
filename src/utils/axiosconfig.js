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
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  
  if(decoded.id.role === "gestor") return "gestor";
  else if(decoded.id.role === "empresa/rh") return "empresa/rh";
  else if(decoded.id.role === "admin") return "admin";
  else if(decoded.id.role === "funcionario") return "funcionario";
}

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
  },
};

export const configAdvanced = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
    'Content-Type': 'multipart/form-data',
  },
};

export const configAdvanced2 = {
  responseType: "blob",
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
  },
};
