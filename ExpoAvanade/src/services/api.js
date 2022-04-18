// faz a importação do pacote axios
import axios from 'axios';

// define a função para chamada das requisições
const api = axios.create({
  // define a URL base das requisições
  //baseURL: 'https://623afa8d2e056d1037eac65b.mockapi.io',
<<<<<<< HEAD
  //baseURL: 'http://192.168.15.11:5000/api',
  baseURL: 'http://192.168.3.115:5000/api',
=======
  baseURL: 'http://192.168.5.38:5000/api',
  //baseURL: 'http://192.168.3.88:5000/api',
>>>>>>> 5894259e4b7783ec3c46a5eb0633aaf211e868a7
  //baseURL: 'https://avanade11.azurewebsites.net/api',
});

// define o padrão de exportação
export default api;