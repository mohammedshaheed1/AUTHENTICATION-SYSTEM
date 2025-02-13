import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom'

const App = () => {

  const auth=useSelector((state)=>state.auth.status)
  console.log("upcoming data",auth)
  return (
    <div className="min-h-screen flex  bg-gray-400  items-center justify-center w-full">
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App