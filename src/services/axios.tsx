import axios from 'axios';

// const accessToken = localStorage.getItem('accessToken');

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default baseAxios;
