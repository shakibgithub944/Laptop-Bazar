import React from 'react';
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const AllBuyers = () => {
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allbuyers', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data;
        }

    })
    const handleDeleteUser = (id) => {
        const deleteUser = window.confirm('Are you sure to Delete?')
        if (deleteUser) {
            fetch(`http://localhost:5000/user/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        refetch()
                        toast.success('User Deleted')
                    }
                })
        }


    }


    return (
        <div>
            <h1 className='text-3xl font-bold my-10'>All Buyers</h1>
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
                            buyers.map((user, i) => <tr
                                key={i}
                                className="hover">
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
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

export default AllBuyers;