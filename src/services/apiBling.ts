import axios from "axios";

const api = axios.create({
  baseURL: "https://bling.com.br/Api/v2/",
});

export default api;
