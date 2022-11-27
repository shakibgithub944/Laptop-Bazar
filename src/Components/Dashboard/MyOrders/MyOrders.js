import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../UserContext/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)

    const { data: myproducts = [] } = useQuery({
        queryKey: ['bookedproducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/booked/product/${user?.email}`)
            const data = await res.json()
            return data;
        }
    })



    return (
        <div>
            <h1 className='text-3xl my-4 font-bold'>My Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-center">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Coustomer Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myproducts.map((product, i) => <tr
                                key={i}
                                className="hover">
                                <th>{i + 1}</th>
                                <td className='flex items-center gap-3'>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={product.image} alt='' />
                                        </div>
                                    </div>
                                    {product.title}</td>
                                <td>{product.name}</td>
                                <td>{product.email}</td>
                                <td>{product.phone}</td>
                                <td>{product.price}</td>
                                <td>{product.location}</td>
                                <td>
                                    {
                                        product.price && !product.paid && <Link
                                        to={`/dashboard/payment/${product._id}`}>
                                            <button className='btn btn-info text-white btn-sm mr-3'>Pay</button>
                                        </Link>
                                    }
                                    {
                                        product.price && product.paid && <Link
                                            to={``}>
                                            <button className='text-green-500 font-bold mr-3'>Paid</button>
                                        </Link>
                                    }
                                    {/* <button className='btn btn-sm btn-error'>Clear</button> */}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrders;