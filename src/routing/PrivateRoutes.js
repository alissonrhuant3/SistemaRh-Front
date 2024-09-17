import { Navigate } from "react-router-dom";
import { verifyExpJwtToken, verifyRole } from "../utils/axiosconfig";


export const PrivateRoutes = ({ children }) => {
  const statusJwt = verifyExpJwtToken();
  return statusJwt !== "Usuário não logado" && statusJwt !== false ? children : (<Navigate to="/" replace={true}/>)
};

export const AdminRoutes = ({ children }) => {
  const role = verifyRole();
  return role === "admin" ? children : (<Navigate to="/admin" replace={true}/>)
};

export const AdminAndEmpresarhRoutes = ({ children }) => {
  const role = verifyRole();
  return role === "admin" || role === "empresa/rh" ? children : (<Navigate to="/admin" replace={true}/>)
};

