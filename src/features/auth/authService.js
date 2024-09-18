import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config, configAdvanced, configAdvanced2 } from "../../utils/axiosconfig";

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

const getFuncionario = async (id) => {
  const response = await axios.get(`${base_url}/funcionario/${id}`, config);
  return response.data;
};

const getAllFuncionariosEmpresa = async () => {
  const response = await axios.get(`${base_url}/funcionario/funcemp`, config);
  return response.data;
};

const getAllFuncionariosEmpresaGestor = async () => {
  const response = await axios.get(`${base_url}/funcionario/funcempg`, config);
  return response.data;
};

const getAllFuncionarioProjetos = async () => {
  const response = await axios.get(`${base_url}/funcionario/todos-projetos`, config);
  return response.data;
};

const getApontamentosFuncionario = async (id) => {
  const response = await axios.get(`${base_url}/funcionario/apontamentos/${id}`, config);
  return response.data;
};

const downloadContrato = async (id) => {
  const response = await axios.get(`${base_url}/funcionario/download/${id}`, configAdvanced2);
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "contrato.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const associarFuncionarioProjeto = async (data) => {
  const response = await axios.post(`${base_url}/funcionario/associar-projeto/`,{projetoId: data.idProjeto, funcionarioId: data.idFuncionario}, config);
  return response.data;
};

const registerPonto = async (data) => {
    const response = await axios.post(`${base_url}/funcionario/horainicialam`, {projetoId: data.projeto, tarefa: data.tarefa}, config)
    return response.data;
}

const createFuncionario = async (formData) => {
  const response = await axios.post(`${base_url}/funcionario/registrar/`,formData, configAdvanced);
  return response.data;
};

const updateFuncionario = async (data) => {
  const response = await axios.put(`${base_url}/funcionario/edit-funcionario/${data.id}`,data.data, config);
  return response.data;
};

const desassociarFuncionarioProjeto = async (data) => {
  const response = await axios.put(`${base_url}/funcionario/delete-associacao/`,{projetoId: data.idProjeto, funcionarioId: data.idFuncionario}, config);
  return response.data;
};

const aprovarHEGestor = async (data) => {
  const response = await axios.put(`${base_url}/funcionario/gestoraprova`, data, config)
  return response.data;
}

const updatePassword = async (data) => {
  const response = await axios.put(`${base_url}/funcionario/password`,data, config);
  return response.data;
}

const deleteFuncionario = async (id) => {
  const response = await axios.delete(`${base_url}/funcionario/delete-funcionario/${id}`, config)
  return response.data;
}

const authService = {
  login,
  getAllFuncionarios,
  getFuncionario,
  getAllFuncionariosEmpresa,
  getAllFuncionariosEmpresaGestor,
  getAllFuncionarioProjetos,
  getApontamentosFuncionario,
  associarFuncionarioProjeto,
  desassociarFuncionarioProjeto,
  aprovarHEGestor,
  createFuncionario,
  updateFuncionario,
  updatePassword,
  deleteFuncionario,
  registerPonto,
  downloadContrato,
};

export default authService;
