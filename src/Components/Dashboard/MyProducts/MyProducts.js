import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../UserContext/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const url = `https://laptop-bazar-server-psi.vercel.app/myproduct?email=${user?.email}`
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data;
        }
    })
    const handleDeleteProduc = id => {
        const deleteProduct = window.confirm('Are you sure to Delete?')
        if (deleteProduct) {
            fetch(`https://laptop-bazar-server-psi.vercel.app/reportedItem/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
    const handleAdvertise = id => {
        console.log(id);
        fetch(`https://laptop-bazar-server-psi.vercel.app/allproduct/advertise/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('Product successfully advertised.')
                }

            })

    }


    return (
        <div>
            <h1 className="text-3xl font-bold my-10">My Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Product Status</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, i) => <tr
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
                                <td>{item.item}</td>
                                <td>$ {item.sellingprice}</td>
                                <td>
                                    <span
                                        className=''>
                                        <button
                                            onClick={() => handleAdvertise(item._id)}
                                            disabled={item.item === 'sold' || item.isAdvertise === 'advertise'}
                                            className='btn btn-sm btn-success mr-2'
                                        >
                                            Advertise
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduc(item._id)}
                                            className='btn btn-sm btn-error'
                                        >Delete</button>
                                    </span>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;