import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'mocha.token': token } = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:4444',
});

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}

// api.interceptors.request.use(async config => {
//   const token = localStorage.getItem(`@sia:${process.env.REACT_APP_ENV}/token`);
//   if (token) {
//     config.headers.authorization = token;
//   }

//   return config;
// });

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response);
  },
);
