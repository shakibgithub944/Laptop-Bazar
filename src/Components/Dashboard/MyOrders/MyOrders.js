import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
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
                                <td>{product.title}</td>
                                <td>{product.name}</td>
                                <td>{product.email}</td>
                                <td>{product.phone}</td>
                                <td>{product.price}</td>
                                <td>{product.location}</td>
                                <td>
                                    <button className='btn btn-sm btn-success mr-2'>Pay</button>
                                    <button className='btn btn-sm btn-error'>Clear</button>
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