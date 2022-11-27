import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../UserContext/AuthProvider';
import useToken from '../../Hooks/UseToken';

const Login = () => {
    const [error, setError]=useState('')
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loginUser, handleGoogleSignIn } = useContext(AuthContext);

    const [createEmail, setcreatedEmail] = useState('');
    const [token] = useToken(createEmail);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true })
    }

    const handleFormSubmit = data => {

        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user.email);
                // setCreateEmail(data.email)
                fetch(`https://laptop-bazar-server-psi.vercel.app/jwt?email=${data.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        navigate(from, { replace: true })
                        localStorage.setItem('accessToken', data.accessToken);
                    }
                })
                toast.success('Login successful')
            })
            .catch(err => {
                setError(err.message)
            })

    }
    const savedUser = (name, email, role) => {
        const user = { name, email, role }
        fetch('https://laptop-bazar-server-psi.vercel.app/user/login', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setcreatedEmail(email)
            })
    }
    const googleSignIn = () => {
        const role={
            role:'Buyer'
        }
        handleGoogleSignIn()
            .then(result => {
                console.log(result.user.email);
                fetch(`https://laptop-bazar-server-psi.vercel.app/jwt?email=${result.user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                    }
                })
                savedUser(result.user.displayName, result.user.email, role.role)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='h-[480px] w-96 p-7 shadow-lg rounded-lg'>
                <h1 className='text-xl text-info text-center my-5'>Login</h1>

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
                    <p className='text-red-500 my-2'>{error}</p>
                    <input type="submit" value={'Login'} className='btn btn-info w-full text-white' />
                </form>
                <p className='text-center text-success my-4'>New to Laptop-Bazar? <Link className='text-info' to='/register'>Create new account</Link> </p>
                <div className="divider">OR</div>
                <button type="submit" onClick={googleSignIn} className='btn btn-outline w-full uppercase' >Continue with Google</button>

            </div>
        </div>
    );
};

export default Login;