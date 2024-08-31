import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getAllProjetos = async () => {
  const response = await axios.get(`${base_url}/projeto`, config)
  return response.data;
}

const getAProjeto = async (id) => {
  const response = await axios.get(`${base_url}/projeto/${id}`, config)
  return response.data;
}

const createProjeto = async (data) => {
  const response = await axios.post(`${base_url}/projeto/registrar`,data, config)
  return response.data;
}

const deleteProjeto = async (id) => {
  const response = await axios.delete(`${base_url}/projeto/delete-projeto/${id}`, config)
  return response.data;
}

const updateProjeto = async (data) => {
  const response = await axios.put(`${base_url}/projeto/editar-projeto/${data.id}`,data.projetoData, config)
  return response.data;
}


const projetoService = {
  createProjeto,
  getAllProjetos,
  getAProjeto,
  deleteProjeto,
  updateProjeto,
}

export default projetoService;