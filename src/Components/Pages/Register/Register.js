import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../UserContext/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/UseToken';


const Register = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, handleGoogleSignIn } = useContext(AuthContext);

    const navigate = useNavigate();
    // coustom hook for jwt
    const [createdEmail, setcreatedEmail] = useState('');
    const [token] = useToken(createdEmail);

    if (token) {
        navigate('/')
    }

    const handleSignUp = data => {
        console.log(data.email, data.role)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                updateUser(data.name)
                    .then(() => { })
                    .then(err => console.log(err))
                savedUser(data.name, data.email, data.role)
                toast.success('Successfully created account.')
                console.log(user);
            })
            .then(err => console.log(err))
    }

    // user save to db
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
                console.log(result.user);
                fetch(`https://laptop-bazar-server-psi.vercel.app/jwt?email=${result.user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        // navigate(from, { replace: true })
                        localStorage.setItem('accessToken', data.accessToken);
                    }
                })
                savedUser(result.user.displayName, result.user.email, role.role)
                toast.success('Login succesfull.')
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='h-[580px] w-96 p-7 shadow-lg rounded-lg'>
                <h1 className='text-xl text-info text-center my-5'>Sign Up</h1>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text"{...register("name", {
                            required: "Name is required."

                        })}
                            className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email"{...register("email", {
                            required: "Email address is required."

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
                    </div>
                    <div className="form-control w-full mb-7">
                        <label className="label"><span className="label-text">Your Identity</span></label>
                        <select {...register("role", {
                            required: "Select role it's required."

                        })}
                            className="select select-bordered w-full max-w-xs">
                            <option>Buyer</option>
                            <option>Seller</option>

                        </select>
                    </div>
                    <input type="submit" value={'Sign Up'} className='btn btn-info w-full text-white' />
                </form>
                <p className='text-center text-success my-4'>Already have an account?<Link className='text-info' to='/login'> Login</Link> </p>
                <div className="divider">OR</div>
                <button type="submit" onClick={googleSignIn} className='btn btn-outline w-full uppercase' >Continue with Google</button>

            </div>
        </div>
    );
};

export default Register;