import React from 'react'
import { useSelector } from 'react-redux'

const App = () => {

  const auth=useSelector((state)=>state.auth.status)
  console.log("upcoming data",auth)
  return (
    <div className='text-4xl'>App</div>
  )
}

export default App