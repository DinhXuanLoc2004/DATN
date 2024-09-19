import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  loginRequest,
  loginResponse,
  ref_accessTokenResponse,
} from '../types/auth.type';

const URL_AUTH = '/auth';

const loginAPI = async (body: loginRequest) => {
  return await axiosIntercreptor.post<loginRequest, loginResponse>(
    `${URL_AUTH}/login`,
    body,
  );
};

const ref_accessTokenAPI = async (body: {refreshToken: string}) => {
  return await axiosIntercreptor.post<
    {refreshToken: string},
    ref_accessTokenResponse
  >('token/ref_accessToken', body);
};

export {loginAPI, ref_accessTokenAPI};
