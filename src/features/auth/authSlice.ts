import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  accessToken: any;
  isAuthenticated: boolean;
}

const initialState: AuthState = {

  username: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ username: string; accessToken: any }>
    ) {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    
    },
    logoutSuccess(state) {
     
      state.isAuthenticated = false;
      
      state.username = null;
      state.accessToken = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
