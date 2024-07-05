import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  userInfo: {
    id: string;
    email: string;
    userName: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  userInfo: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<{ accessToken: string; userInfo: any }>) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
    },
    clearAuthInfo: (state) => {
      state.accessToken = null;
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthInfo, clearAuthInfo } = authSlice.actions;
export default authSlice.reducer;
