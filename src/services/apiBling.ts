//Import of node modules
import axios from "axios";

//Creation of the variable that will represent the Bling api
const api = axios.create({
  baseURL: "https://bling.com.br/Api/v2/",
});

export default api;
