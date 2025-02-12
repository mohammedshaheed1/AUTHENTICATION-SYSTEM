import {createSlice} from '@reduxjs/toolkit'


const initialState={
     status:false,
     userData:null
}


const authSlice = createSlice({
      name:"auth",
      initialState,
      reducers:{
           login:(state,action)=>{
                state.status=true
           }
      }
})


export const {login}=authSlice.actions
export default authSlice.reducer