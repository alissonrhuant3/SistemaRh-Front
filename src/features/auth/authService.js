import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

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

const getAllFuncionarios = async () => {
  const response = await axios.get(`${base_url}/funcionario`, config);
  return response.data;
};

const getAllFuncionariosEmpresa = async () => {
  const response = await axios.get(`${base_url}/funcionario/funcemp`, config);
  return response.data;
};

const getAllFuncionarioProjetos = async (id) => {
  const response = await axios.get(`${base_url}/funcionario/todos-projetos/${id}`, config);
  return response.data;
};

const associarFuncionarioProjeto = async (data) => {
  const response = await axios.post(`${base_url}/funcionario/associar-projeto/`,data, config);
  return response.data;
};

const desassociarFuncionarioProjeto = async (data) => {
  const response = await axios.delete(`${base_url}/funcionario/delete-associacao/`,data, config);
  return response.data;
};

const authService = {
  login,
  getAllFuncionarios,
  getAllFuncionariosEmpresa,
  getAllFuncionarioProjetos,
  associarFuncionarioProjeto,
  desassociarFuncionarioProjeto
};

export default authService;
