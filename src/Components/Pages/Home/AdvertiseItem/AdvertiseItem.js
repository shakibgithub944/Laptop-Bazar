import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import BookingModal from '../../BookingModal/BookingModal';

const AdvertiseItem = () => {
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
    const { data: advertiseItems = [], refetch } = useQuery({
        queryKey: ['advertiseItems'],
        queryFn: async () => {
            const res = await fetch('https://laptop-bazar-server-psi.vercel.app/advertise/product')
            const data = await res.json()
            return data;
        }
    })
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
                    refetch()
                    toast.success('An admin check your report. Thank you.')
                }

            })

    }

    return (
        <d>
            {
                advertiseItems?.length > 0 && < div className='my-16'>
                    <h1 className='text-3xl text-center my-4'>Advertise Products</h1>
                    <hr className='w-96 mx-auto mb-16' />
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 mx-7'>
                        {
                            advertiseItems.map(advertiseItem => <div
                                key={advertiseItem._id}
                                className="card w-96 glass">
                                <figure><img src={advertiseItem.image} alt="car!" className='w-full h-64' /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{advertiseItem.title}</h2>
                                    <p>Detail: {advertiseItem.description}</p>
                                    <p>Post Date:{advertiseItem.postdate}</p>
                                    <p>Condition: {advertiseItem.condition}</p>
                                    <p>Year of purchase: {advertiseItem.purchasetime}</p>
                                    <p>Location: {advertiseItem.location}</p>
                                    <p>Mobile: {advertiseItem.number}</p>
                                    <p className='flex items-center gap-1'>Seller: {advertiseItem.seller}

                                        {
                                            verified.includes(`${advertiseItem.seller}`) && <CheckCircleIcon className="h-4 w-4 text-blue-500"></CheckCircleIcon>
                                        }
                                    </p>
                                    <p>Buying Price: <del>{advertiseItem.originalprice}$</del> </p>
                                    <p>Selling Price: <b>{advertiseItem.sellingprice}$</b></p>
                                    <div className="card-actions justify-between">
                                        <p
                                            onClick={() => handleReportedProduct(advertiseItem._id)}
                                            className="my-4 link link-info"
                                        >Report to admin</p>
                                        <label
                                            htmlFor="booking-modal"
                                            className="btn btn-info text-white"
                                            onClick={() => setProduct(advertiseItem)}
                                        >Book Now</label>
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


            }
        </d>
    );
};

export default AdvertiseItem;