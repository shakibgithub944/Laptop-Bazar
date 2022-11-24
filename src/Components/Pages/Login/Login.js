import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../UserContext/AuthProvider';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loginUser, handleGoogleSignIn } = useContext(AuthContext);

    // const [createEmail, setCreateEmail] = useState('');
    // const [token] = useToken(createEmail);

    // const location = useLocation();
    // const navigate = useNavigate();
    // const from = location.state?.from?.pathname || '/';

    // if (token) {
    //     navigate(from, { replace: true })
    // }

    const handleFormSubmit = data => {

        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // setCreateEmail(data.email)
                toast.success('Login successful')

            })
            .then(err => console.log(err))

    }
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='h-[480px] w-96 p-7 shadow-lg rounded-lg'>
                <h1 className='text-xl text-accent text-center my-5'>Login</h1>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email"{...register("email", {
                            required: "Email Address is required."

                        })}
                            className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"{...register("password", {
                            required: "Password is required.",
                            minLength: { value: 6, message: 'Password must be 6 character or long.' }

                        })}
                            className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt mb-4">Forgot Password?</span>
                        </label>
                    </div>
                    <input type="submit" value={'Login'} className='btn btn-accent w-full' />
                </form>
                <p className='text-center text-accent my-4'>New to Laptop-Bazar? <Link className='text-secondary' to='/register'>Create new account</Link> </p>
                <div className="divider">OR</div>
                <button type="submit"onClick={googleSignIn} className='btn btn-outline w-full uppercase' >Continue with Google</button>

            </div>
        </div>
    );
};

export default Login;