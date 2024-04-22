import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const generateProduct = async (title, price) => {
  return api.post('/generate-product', {title, price});
}

export const checkCredentials = async () => {
  const response = await api.get('/check-credentials');
  return response.data.result;
}