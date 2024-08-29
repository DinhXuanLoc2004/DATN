import axios from 'axios';
import {store} from '../store/store';
const baseURL = 'http://192.168.1.44:5000/v1/api';

const axiosIntercreptor = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosIntercreptor.interceptors.request.use(
  request => {
    const accessToken = store.getState()?.auth?.tokens?.accessToken;
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  err => {
    return Promise.reject(err);
  },
);
axiosIntercreptor.interceptors.response.use(
  response => {
    return response.data
  }
)

export default axiosIntercreptor
