import { Link } from "react-router-dom"
import Button from "../custom/Button"
import Input from "../custom/Input"


const LoginComponents = () => {

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/sign"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                <form className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email : "
                            placeholder="Email Address"
                            type="email"
                        />
                        <Input
                            label="Password : "
                            type="password"
                            placeholder="Password"
                        />
                        <Button type="submit" className="w-full">
                            Sign in{" "}
                        </Button>
                        <p className="mt-2 text-center text-base text-black/60">
                   
                    <Link
                        to="/sign"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Reset Your Password ?
                    </Link>
                </p>
                        

                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComponents