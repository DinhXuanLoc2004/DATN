import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  loginRequest,
  loginResponse,
  ref_accessTokenResponse,
  resendOtpRequest,
  resendOtpResponse,
  signUpRequest,
  signUpResponse,
  verifyOtpRequest,
  verifyOtpResponse,
} from '../types/auth.type';

const URL_AUTH = '/auth';

const signUpAPI = async (body: signUpRequest) => {
  return await axiosIntercreptor.post<signUpRequest, signUpResponse>(
    `${URL_AUTH}/signup`,
    body,
  );
};

const resendOtpAPI = async (body: resendOtpRequest) => {
  try {
    return await axiosIntercreptor.post<resendOtpRequest, resendOtpResponse>(
      `${URL_AUTH}/resend_otp`,
      body,
    );
  } catch (err) {
    console.log('Error resendOtpAPI', err);
  }
};

const verifyOtpAPI = async (body: verifyOtpRequest) => {
  return await axiosIntercreptor.post<verifyOtpRequest, verifyOtpResponse>(
    `${URL_AUTH}/verify_otp`,
    body,
  );
};

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

export {loginAPI, ref_accessTokenAPI, verifyOtpAPI, resendOtpAPI, signUpAPI};
