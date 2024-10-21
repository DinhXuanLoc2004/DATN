import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginThunk, verifyThunk} from '../thunk/auth.thunk';
import {ref_accessTokenResponse} from '../../types/auth.type';
const initialState = {
  user: {
    userId: '',
    email: '',
    status: '',
  },
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  status: {
    loading: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ref_accessToken: (
      state,
      action: PayloadAction<ref_accessTokenResponse>,
    ) => {
      state.tokens.accessToken = action.payload.metadata.accessToken;
    },
    log_out: state => {
      state.user.email = '';
      state.user.userId = '';
      state.user.status = '';
    },
  },
  extraReducers: buider => {
    buider
      .addCase(loginThunk.pending, state => {
        state.status.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status.loading = false;
        if (action.payload.metadata.user.status === 'active') {
          state.user.userId = action.payload.metadata.user._id;
          state.user.email = action.payload.metadata.user.email;
          state.user.status = action.payload.metadata.user.status;
          state.tokens.accessToken = action.payload.metadata.tokens.accessToken;
          state.tokens.refreshToken =
            action.payload.metadata.tokens.refreshToken;
        }
      })
      .addCase(loginThunk.rejected, state => {
        state.status.loading = false;
        console.log('err loginThunk.rejected');
      })
      .addCase(verifyThunk.pending, state => {
        state.status.loading = true;
      })
      .addCase(verifyThunk.fulfilled, (state, action) => {
        state.status.loading = false;
        if (action.payload.metadata.status === 'active') {
          state.user.userId = action.payload.metadata._id;
          state.user.email = action.payload.metadata.email;
          state.user.status = action.payload.metadata.status;
        }
      })
      .addCase(verifyThunk.rejected, state => {
        state.status.loading = false;
        console.log('err verifyThunk.rejected');
      });
  },
});

export const authReducer = authSlice.reducer;
export const {ref_accessToken, log_out} = authSlice.actions;
