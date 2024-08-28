import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getEmpresas = async () => {
  const response = await axios.get(`${base_url}/empresa`, config);
  return response.data;
};

const empresaService = {
  getEmpresas,
};

export default empresaService;
