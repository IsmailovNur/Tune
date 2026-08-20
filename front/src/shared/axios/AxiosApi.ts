import axios from 'axios';

export const apiURL = 'http://localhost:8000';

const axiosApi = axios.create({
  baseURL: apiURL,
});

export default axiosApi;