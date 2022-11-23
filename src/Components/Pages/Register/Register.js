import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../UserContext/AuthProvider';
import { Link } from 'react-router-dom';


const Register = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);

    // const navigate = useNavigate();
    // coustom hook for jwt
    // const [createdEmail, setcreatedEmail] = useState('');
    // const [token] = useToken(createdEmail);

    // if (token) {
    //     navigate('/')
    // }

    const handleSignUp = data => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                updateUser(data.name)
                    .then(() => { })
                    .then(err => console.log(err))
                // savedUser(data.name, data.email)
                toast.success('Successfully created account.')
                console.log(user);
            })
            .then(err => console.log(err))
    }

    // user save to db
    // const savedUser = (name, email) => {
    //     const user = { name, email }
    //     fetch('http://localhost:5000/user', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setcreatedEmail(email)
    //             // getJwtToken(email)
    //         })
    // }
     // get jwt token
    // const getJwtToken = email => {
    //     fetch(`http://localhost:5000/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.accessToken) {
    //                 localStorage.setItem('accessToken', data.accessToken);
    //                 navigate('/');
    //             }
    //         })
    // }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='h-[556px] w-96 p-7 shadow-lg rounded-lg'>
                <h1 className='text-xl text-accent text-center my-5'>Sign Up</h1>

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
                    <div className="form-control w-full mb-7">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"{...register("password", {
                            required: "Password is required.",
                            minLength: { value: 6, message: 'Password must be 6 character or long.' }

                        })}
                            className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                    </div>
                    <input type="submit" value={'Sign Up'} className='btn btn-accent w-full' />
                </form>
                <p className='text-center text-accent my-4'>Already have an account?<Link className='text-secondary' to='/login'> Login</Link> </p>
                <div className="divider">OR</div>
                <button type="submit" className='btn btn-outline w-full uppercase' >Continue with Google</button>

            </div>
        </div>
    );
};

export default Register;