import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import BookingModal from '../BookingModal/BookingModal';

const AllProducts = () => {
    const allProducts = useLoaderData();
    const [verified, setVerified] = useState('')
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get('https://laptop-bazar-server-psi.vercel.app/alluser')
            .then(data => {
                const users = data.data.filter(data => data.status === 'verified')
                const verify = users.map(vuser => vuser.name)
                setVerified(verify);

            })
    }, [])

    const handleReportedProduct = (id) => {
        fetch(`https://laptop-bazar-server-psi.vercel.app/allproduct/reported/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('An admin check your report. Thank you.')
                }

            })

    }

    return (
        <div>
            <h1 className='text-3xl my-10 text-center'>All Produtcs </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-7 mb-10'>

                {
                    allProducts.map(product => <div
                        key={product._id}
                        className="card w-96 glass">
                        <figure><img src={product.image} alt="car!" className='w-full h-64' /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.title}</h2>
                            <p>Detail: {product.description}</p>
                            <p>Post Date:{product.postdate}</p>
                            <p>Condition: {product.condition}</p>
                            <p>Year of purchase: {product.purchasetime}</p>
                            <p>Location: {product.location}</p>
                            <p>Mobile: {product.number}</p>
                            <p className='flex items-center gap-1'>Seller: {product.seller}

                                {
                                    verified.includes(`${product.seller}`) && <CheckCircleIcon className="h-4 w-4 text-blue-500"></CheckCircleIcon>
                                }
                            </p>
                            <p>Buying Price: <del>{product.originalprice}$</del> </p>
                            <p>Selling Price: <b>{product.sellingprice}$</b></p>
                            <div className="card-actions justify-between">
                                <p onClick={() => handleReportedProduct(product._id)} className="my-4 link link-info">Report to admin</p>
                                <label
                                    htmlFor="booking-modal"
                                    className="btn btn-info text-white"
                                    onClick={() => setProduct(product)}
                                >Book Now</label>
                                {/* <button className="btn btn-accent">Book now!</button> */}
                            </div>
                        </div>
                    </div>)
                }

            </div>
            <BookingModal
            product={product}
            setProduct={setProduct}
            >

            </BookingModal>
        </div>
    );
};

export default AllProducts;