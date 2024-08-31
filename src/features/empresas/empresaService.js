import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getEmpresas = async () => {
  const response = await axios.get(`${base_url}/empresa`, config);
  return response.data;
};

const editEmpresa = async (empresaData) => {
  const response = await axios.put(`${base_url}/empresa/editar-empresa/${empresaData.id}`,empresaData.empresaData, config);
  return response.data;
} 

const createEmpresa = async (empresaData) => {
  const response = await axios.post(`${base_url}/empresa/registrar`, empresaData, config);
  return response.data;
}

const deleteEmpresa = async (id) => {
  console.log(id);
  
  const response = await axios.delete(`${base_url}/empresa/delete-empresa/${id}`, config);
  return response.data;
}

const empresaService = {
  getEmpresas,
  editEmpresa,
  createEmpresa,
  deleteEmpresa,
};

export default empresaService;
