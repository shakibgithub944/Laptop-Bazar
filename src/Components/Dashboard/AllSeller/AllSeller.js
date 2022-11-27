import React from 'react';
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const AllSeller = () => {

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['allseller'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allseller', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data;
        }

    })

    const handleverify = id => {
        fetch(`http://localhost:5000/allUsers/verify/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    refetch()
                    toast.success('Successfully Verified')
                }

            })
    }
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
                        toast.success('Seller Deleted')
                    }
                })
        }


    }

    return (
        <div>
            <h1 className='text-3xl my-10 font-bold'>All Seller</h1>
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
                            sellers.map((user, i) => <tr
                                key={i}
                                className="hover">
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className='flex items-center justify-center gap-2'>{user.status}
                                    {
                                    user.status && <CheckCircleIcon className='h-4 w-4 text-blue-500'></CheckCircleIcon>
                                    }
                                </td>
                                <td>{user.role}</td>
                                <td>
                                    {
                                        <button
                                        disabled={user?.status === 'verified'}
                                          onClick={() => handleverify(user._id)}
                                           className='btn btn-sm mx-3 btn-accent'
                                           >Verified</button>
                                    }
                                    
                                    <button onClick={() => handleDeleteUser(user._id)} className='btn btn-sm btn-error'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default AllSeller;