// faz a importação do pacote axios
import axios from 'axios';

// define a função para chamada das requisições
const api = axios.create({
  // define a URL base das requisições
  //baseURL: 'https://623afa8d2e056d1037eac65b.mockapi.io',
  //baseURL: 'http://192.168.3.88:5000/api',
  baseURL: 'http://192.168.0.9:5000/api',
  //baseURL: 'http://192.168.4.187:5000/api',
  //baseURL: 'https://api-avanade.azurewebsites.net/api',
});

// define o padrão de exportação
export default api;