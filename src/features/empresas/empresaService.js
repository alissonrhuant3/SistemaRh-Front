import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getEmpresas = async () => {
  const response = await axios.get(`${base_url}/empresa`, config);
  return response.data;
};

const editEmpresa = async (empresaData) => {
  console.log(empresaData.empresaData);
  const response = await axios.put(`${base_url}/empresa/editar-empresa/${empresaData.id}`,empresaData.empresaData, config)
  return response.data;
} 

const empresaService = {
  getEmpresas,
  editEmpresa,
};

export default empresaService;
