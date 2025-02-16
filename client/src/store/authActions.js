import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../axios';
import { toast } from 'react-toastify';

// Define an async thunk for user registration


// const backentURL= import.meta.env.VITE_BACKENT_URL


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {

    console.log("async", userData)
    try {
      const response = await axiosInstance.post('/api/auth/register', userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("data is", response.data.success)
      if (response.data.success) {
        return response.data;
      }

    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.data.error);
      } else if (error.request) {
        toast.error('Network error, please try again later.')
        return rejectWithValue('Network error, please try again later.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', loginData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.success) {
        return response.data;
      }

    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.data.error);
      } else if (error.request) {
        return rejectWithValue('Network error, please try again later.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/user/data', {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.data.error);
      } else if (error.request) {
        return rejectWithValue('Network error, please try again later.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAuthStatus = createAsyncThunk(
  'auth/getAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/auth/is-auth', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.data.error);
      } else if (error.request) {
        return rejectWithValue('Network error, please try again later.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const getLogoutUser = createAsyncThunk(
  'auth/getLogoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/logout', {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.data.error);
      } else if (error.request) {
        return rejectWithValue('Network error, please try again later.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const sendVerificationOtp = createAsyncThunk(
  'auth/sendVerificationOtp',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/send-verify-otp', {}, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data; // Return the response data on success

    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.data.error);
      } else if (error.request) {
        return rejectWithValue('Network error, please try again later.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const verifyemail = createAsyncThunk(
  'auth/verifyemail',
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/verify-account', { otp }, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data;

    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || error.response.data.error);
      } else if (error.request) {
        return rejectWithValue('Network error, please try again later.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)