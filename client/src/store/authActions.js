import {  createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../axios';
import { toast } from 'react-toastify';

// Define an async thunk for user registration


// const backentURL= import.meta.env.VITE_BACKENT_URL


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {

    console.log("async",userData)
    try {
      const response = await axiosInstance.post('/api/auth/register', userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("data is",response.data.success)
      if(response.data.success){
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
        const response = await axios.post('http://localhost:4000/api/auth/login', loginData, {
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

