import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import { AuthContext } from '../../UserContext/AuthProvider';

const Alluser = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext)


    useEffect(() => {
        axios.get('https://laptop-bazar-server-psi.vercel.app/alluser')
            .then(data => {
                setUsers(data.data);
            })
    }, [users])

    const handleDeleteUser = (id) => {
        const deleteUser = window.confirm('Are you sure to Delete?')
        if (deleteUser) {
            fetch(`https://laptop-bazar-server-psi.vercel.app/user/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('User Deleted')
                    }
                })
        }


    }

    return (
        <div>
            <h1 className='text-3xl my-10 font-bold'>All users</h1>

            <div className="overflow-x-auto">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((userr, i) => <tr
                                key={i}
                                className="hover">
                                <th>{i + 1}</th>
                                <td>{userr.name}</td>
                                <td>{userr.email}</td>
                                <td>{userr.role}</td>
                                <td>
                                    {
                                        user?.email !== userr.email ? <button onClick={() => handleDeleteUser(user._id)} className='btn btn-sm btn-error'>Delete</button> : 'Current user'
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Alluser;