import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';

const App = () => {

  const auth=useSelector((state)=>state.auth.status)
  console.log("upcoming data",auth)
  return (
    <div>
      <ToastContainer/>
      <div className="w-full block">
      <Navbar/>
      </div>
    <div className="min-h-screen flex  bg-gray-400  items-center justify-center w-full">
      <main>
        <Outlet />
      </main>
    </div>
    </div>
  )
}

export default App