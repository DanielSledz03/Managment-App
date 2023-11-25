import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  login: string;
  password: string;
  accessToken: string | null;
  refreshToken?: string | null;
  userData: { id: number; name: string } | null;
}

const initialState: AuthState = {
  accessToken: null,
  login: '',
  password: '',
  refreshToken: null,
  userData: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },

    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },

    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },

    setRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload;
    },

    setUserData(state, action: PayloadAction<{ id: number; name: string } | null>) {
      state.userData = action.payload;
    },
  },
});

export const AuthSliceActions = AuthSlice.actions;
export default AuthSlice.reducer;
