import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { sendResetOtp } from '../store/authActions'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  
     const navigate =useNavigate()
      const inputRef = React.useRef(Array(6).fill(null)); 
     const [email,setEmail]=useState('')
     const [newPassword,setNewPassword]=useState('')
     const [isEmailsend,setIsEmailSend]=useState('')
     const [otp,setOtp]=useState(0)
     const [isOtpSubmited,setIsOtpSubmited]=useState(false)


     const dispatch = useDispatch()
     const authOtp=useSelector((state)=>state.auth.otp)

     console.log("reset password",authOtp)

     const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
          inputRef.current[index + 1].focus();
        }
      };
    
      // Handle backspace to move to the previous input
      const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
          inputRef.current[index - 1].focus();
        }
      };
    
      // Handle paste
      const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
          if (inputRef.current[index]) {
            inputRef.current[index].value = char;
          }
        });
      };


      const onSubmitEmail = async(e)=>{
           e.preventDefault()
           dispatch(sendResetOtp())

           if(authOtp){
              toast.success("Otp sented to your mail")
              setIsEmailSend(true)
           }

      }


  return (
    <div  className="flex items-center justify-center min-h-screen">
        {!isEmailsend&&
            <form onSubmit={onSubmitEmail} action="" className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
            <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
            <p className="text-center mb-6 text-indigo-300">Enter your registered email address</p>
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
             <img src={assets.mail_icon} alt="" className='w-3 h-3' />
             <input type="email" placeholder='email id' className='bg-transparent outline-none text-white' value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white  rounded-full mt-3'>Submit</button>
          </form>
   
          }
        

   {/* otp field */}
   {!isOtpSubmited&&isEmailsend &&
        <form  action="" className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password otp</h1>
        <p className="text-center mb-6 text-indigo-300">Enter your 6-digit code sent to your email id</p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              ref={(e) => (inputRef.current[index] = e)} // Assign each input to the ref array
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              required
              className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
            />
          ))}
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">Submit</button>
      </form>
   }

        

      {/* enter new password */}

      {!isOtpSubmited && isEmailsend &&

      <form action="" className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
           <h1 className="text-white text-2xl font-semibold text-center mb-4"> new password</h1>
           <p className="text-center mb-6 text-indigo-300">Enter new password below</p>
           <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" className='w-3 h-3' />
            <input type="password" placeholder='password' className='bg-transparent outline-none text-white' value={newPassword} onChange={e=>setNewPassword(e.target.value)} required />
           </div>
           <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white  rounded-full mt-3'>Submit</button>
         </form>
     }
   </div>
  )
}

export default ResetPassword