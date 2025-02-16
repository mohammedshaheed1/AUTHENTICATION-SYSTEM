import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import Button from '../custom/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getLogoutUser, sendVerificationOtp } from '../store/authActions'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OTP = useSelector((state) =>state.auth.otp);
  const authStatus = useSelector((state) => state.auth.userData)

  const logoutuser=()=>{
        dispatch(getLogoutUser()) 
  }

  const sendOtp=()=>{
       dispatch(sendVerificationOtp())
  }

  useEffect(() => {
    if (OTP) {
      navigate('/VerifyEmail');
      toast.info('OTP sent successfully. Please check your email.');
    }
  }, [OTP, navigate]);

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.logo} alt="" className='w-28 sm:w-32' />

        {
             authStatus?(<div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
                 {authStatus?.userData?.name[0]?.toUpperCase()}
                 <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                      <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                       {!authStatus?.userData?.isAccountVerified&&
                           <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={sendOtp}>Verify Email</li>}
                        <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10' onClick={logoutuser}>LogOut</li>
                      </ul>
                 </div>
             </div>):
             ( <Button textColor='text-gray-800' className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all text-blak'>Login <img src={assets.arrow_icon} alt="" /></Button>)
        }
       
       
    </div> 
  )
}

export default Navbar