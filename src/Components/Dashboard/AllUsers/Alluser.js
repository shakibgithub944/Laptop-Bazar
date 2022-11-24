import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Alluser = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/alluser')
            .then(data => {
                setUsers(data.data);
            })
    }, [])

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
                                    <button className='btn btn-sm mx-3 btn-accent'>Make admin</button>
                                    <button className='btn btn-sm btn-error'>Delete</button>
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