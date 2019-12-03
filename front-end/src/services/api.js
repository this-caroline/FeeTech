import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// api.interceptors.request.use(config => {
//   const currentUser = JSON.parse(getToken());

//   if (currentUser) {
//     config.headers.Authorization = `Bearer ${currentUser.token}`;
//   }
//   return config;
// });

export default api;
