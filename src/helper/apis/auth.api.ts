import axiosIntercreptor from '../config/axiosIntercreptor';
import { loginRequest, loginResponse } from '../types/auth.type';

const URL_AUTH = '/user/'

const loginAPI = async (body: loginRequest) => {
    return await axiosIntercreptor.post<loginRequest, loginResponse>(`${URL_AUTH}login`, body)
}

export {loginAPI}

