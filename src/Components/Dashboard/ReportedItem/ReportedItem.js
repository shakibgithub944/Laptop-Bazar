import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const ReportedItem = () => {

    const { data: reportedItems = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedItem'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/reportedItem', {
                headers: {
                    // authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data;
        }

    })
    const handleDeleteReportedItem = id => {
        console.log(id);
        const deleteProduct = window.confirm('Are you sure to Delete?')
        if (deleteProduct) {
            fetch(`http://localhost:5000/reportedItem/${id}`, {
                method: 'DELETE',
                headers: {
                    // authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        refetch()
                        toast.success('Product Deleted From Database.')
                    }
                })
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold my-10">Reported Items</h1>

            <div className="overflow-x-auto">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems.map((item, i) => <tr
                                key={i}
                                className="hover">
                                <th>{i + 1}</th>
                                <td className='flex items-center justify-center'>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full mx-3">
                                            <img src={item.image} alt='' />
                                        </div>
                                    </div>
                                    {item.title}

                                </td>
                                <td>{item.status}</td>
                                <td><button onClick={() => handleDeleteReportedItem(item._id)} className='btn btn-sm btn-error'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedItem;