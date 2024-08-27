import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (userData) => {
  const response = await axios.post(`${base_url}/funcionario/login`, {
    cpf: userData.cpf,
    password: userData.password,
  })
  
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", response.data.token);
    
  }
  return response.data;
};

const authService = {
  login,
};

export default authService;
