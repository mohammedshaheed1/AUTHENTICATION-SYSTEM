import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthStatus, getUserData } from '../store/authActions'

const Home = () => {

   const authStatus = useSelector((state) => state.auth.userData)
   const authlogin = useSelector((state) => state.auth.status)
   const dispatch =useDispatch()

   console.log("user data",authStatus)

   useEffect(()=>{
       dispatch(getAuthStatus())
       if(authlogin){
         dispatch(getUserData())
       }
   },[])

  return (
    <div>
      hello welcome {}
      {authStatus && authStatus?.userData?.name ? authStatus?.userData?.name : "Loading..."}
    </div>
  )
}

export default Home