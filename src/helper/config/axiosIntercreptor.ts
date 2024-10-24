import axios, { AxiosInstance } from 'axios';
import {store} from '../store/store';
import {ref_accessTokenAPI} from '../apis/auth.api';
import {ref_accessToken} from '../store/slices/auth.slice';
import {NetworkInfo} from 'react-native-network-info';

const baseURL = `http://192.168.0.114:5000/v1/api/`;

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
    return response.data;
  },
  async err => {
    const original = err.config;
    if (
      err.response.message === 'AccessToken Expired!' &&
      err.response.status === 401
    ) {
      const refreshToken = store.getState()?.auth?.tokens?.refreshToken;
      const response = await ref_accessTokenAPI({refreshToken});
      store.dispatch(ref_accessToken(response));
      original.headers.authorization = `Bearer ${response.metadata.accessToken}`;
      return await axiosIntercreptor(original);
    } else if (
      err.response.message === 'RefreshToken Expired!' &&
      err.response.status === 403
    ) {
      ///
    }
    return Promise.reject(err.response.data);
  },
);

export default axiosIntercreptor;
