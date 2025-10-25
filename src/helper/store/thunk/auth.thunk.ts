import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginAPI, verifyOtpAPI, resetPasswordAPI} from '../../apis/auth.api';

const loginThunk = createAsyncThunk('auth/login', loginAPI);
const verifyThunk = createAsyncThunk('auth/verify_otp', verifyOtpAPI);

export {loginThunk, verifyThunk};
