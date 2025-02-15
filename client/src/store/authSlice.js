import {createSlice} from '@reduxjs/toolkit'
import { registerUser,loginUser } from './authActions';


const initialState = {
  status: false,
  userData: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handles the pending state of registerUser async thunk
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload; // Assuming response contains user data
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from rejectWithValue
      })
      
      // Handles the pending state of loginUser async thunk
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload; // Assuming response contains user data and token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from rejectWithValue
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;