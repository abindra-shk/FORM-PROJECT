import { createSlice } from '@reduxjs/toolkit';

interface NetworkState {
  info: string;
  status: boolean;
}

const initialState: NetworkState = {
  info: '',
  status: false,
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkInfo: (state, action) => {
      state.info = action.payload;
      state.status = true; // assuming status true means fetching, editing, etc.
    },
    clearNetworkInfo: (state) => {
      state.info = '';
      state.status = false; // reset status after operation completes
    },
  },
});

export const { setNetworkInfo, clearNetworkInfo } = networkSlice.actions;
export default networkSlice.reducer;
