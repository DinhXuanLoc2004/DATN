import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginAPI} from '../../apis/auth.api';
const loginThunk = createAsyncThunk('auth/login', loginAPI);
export {loginThunk};
