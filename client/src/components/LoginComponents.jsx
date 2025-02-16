import { Link } from "react-router-dom"
import Button from "../custom/Button"
import Input from "../custom/Input"
import { useSelector,useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { getUserData, loginUser } from "../store/authActions"
import { assets } from "../assets/assets"


const LoginComponents = () => {
     
    const { status, userData, loading, error } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
   
    const login = async (data) => {
       
        dispatch(loginUser( data ));
        dispatch(getUserData())
       
    }

   

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-slate-900 rounded-lg text-indigo-300 shadow-lg p-10 border border-black/10`}>
        
                <h2 className="bg-slate-90 text-center text-3xl font-semibold text-white" >Login account</h2>
                <p className="mt-2 text-center text-base ">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/sign"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <div  className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                           <img src={assets.mail_icon} alt="" />
                        <Input
                             className="bg-transparent outline-none"
                            placeholder="Email Address"
                            type="email"
                            {...register("email", {
                                required: true,

                            })}
                        />

                        </div>
                       
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.lock_icon} alt="" />
                        <Input
                             className="bg-transparent outline-none"
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        </div>
                        

                      <p className="mb-4 text-indigo-500 cursor-pointer">Forgot password ?</p>
                        <Button type="submit" className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
                            Sign in{" "}
                        </Button>
                      
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComponents
        