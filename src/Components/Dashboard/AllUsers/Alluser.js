import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'

const Alluser = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/alluser')
            .then(data => {
                setUsers(data.data);
            })
    }, [users])

    const handleDeleteUser = (id) => {
        const deleteUser = window.confirm('Are you sure to Delete?')
        if (deleteUser) {
            fetch(`http://localhost:5000/user/${id}`, {
                method: 'DELETE',
                headers: {
                    // authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
                            <th>Status</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr
                                key={i}
                                className="hover">
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>Purple</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user._id)} className='btn btn-sm btn-error'>Delete</button>
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