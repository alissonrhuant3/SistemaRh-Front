import { Navigate } from "react-router-dom";
import { verifyExpJwtToken } from "../utils/axiosconfig";


export const PrivateRoutes = ({ children }) => {
  const statusJwt = verifyExpJwtToken();
  return statusJwt !== "Usuário não logado" && statusJwt !== false ? children : (<Navigate to="/" replace={true}/>)
};
