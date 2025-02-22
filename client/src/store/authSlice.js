import {createSlice} from '@reduxjs/toolkit'
import { registerUser,loginUser, getUserData, getAuthStatus, getLogoutUser, sendVerificationOtp, verifyemail, sendResetOtp } from './authActions';
import { toast } from 'react-toastify';


const initialState = {
  status:JSON.parse(localStorage.getItem('authStatus')) || false,
  userData: null,
  error: null,
  loading: false,
  verification:false,
  otp:false
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
      // Register user actions
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        localStorage.setItem('authStatus', true);
        state.userData = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login user actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("API Response:", action.payload);
    
        state.loading = false;
        
        if (action.payload.success) {
            state.status = true;
            localStorage.setItem('authStatus', true);  
            state.userData = action.payload.userData;  
        } else {
            state.status = false;
            state.message = action.payload.message || "Login failed";
            toast.error(action.payload.message)
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = false;
      })

      // Get user data actions
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get auth status actions
      .addCase(getAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem('authStatus', true);
        state.userData = action.payload;
      })
      .addCase(getAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      //Get auth logout
      .addCase(getLogoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLogoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = false;
        state.status = false;
        localStorage.removeItem('authStatus');  // Remove auth status from localStorage
         state.userData = null;  // Clear user data

      })
      .addCase(getLogoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Get auth Email verification
      .addCase(sendVerificationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerificationOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.status = false;
        state.userData = action.payload;
      })
      .addCase(sendVerificationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Get auth Email verification
      .addCase(verifyemail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyemail.fulfilled, (state, action) => {
        state.loading = false;
        state.status = false;
        state.verification=true
        state.userData = action.payload;
      })
      .addCase(verifyemail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       //Get reset otp
       .addCase(sendResetOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = true;
        state.userData = action.payload;
      })
      .addCase(sendResetOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;