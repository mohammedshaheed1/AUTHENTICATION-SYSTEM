
import { Link } from 'react-router-dom'
import Input from '../custom/Input'
import Button from '../custom/Button'
import {useSelector,useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getUserData, registerUser } from '../store/authActions'
import { assets } from '../assets/assets'


const SignupComponents = () => {

   
    const dispatch = useDispatch();

    const { status, userData, loading, error } =useSelector((state) => state.auth);
   
    const { register, handleSubmit } = useForm()

    const create = async (data) => {

      
        dispatch(registerUser(data));
        dispatch(getUserData())

       
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-slate-900 rounded-lg text-indigo-300 shadow-lg p-10 border border-black/10`}>
                
                <h2 className="bg-slate-90 text-center text-3xl font-semibold text-white "> create account</h2>
                <p className="mt-2 text-center text-base ">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-5">
                        <div  className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                         <img src={assets.person_icon} alt="" />
                         <Input
                            {...register("name", { required: true })}
                            placeholder="Full Name"
                             className="bg-transparent outline-none"
                        />
                        </div>
                         <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.mail_icon} alt="" />
                         <Input
                            {...register("email", {
                                required: true,

                            })}
                            placeholder="Email Address"
                            type="email"
                            className="bg-transparent outline-none"
                        />
                         </div>
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]' >
                            <img src={assets.lock_icon} alt="" />
                        <Input
                            {...register("password", { required: true })}
                            type="password"
                            placeholder="Password"
                            className="bg-transparent outline-none"

                        />
                        </div>
                        
                        <Button type="submit" className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupComponents