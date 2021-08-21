import axios from 'axios';

const token = localStorage.getItem('mocha.token');

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response);
  },
);
