import React, { useContext } from 'react';
import { AuthContext } from '../../UserContext/AuthProvider';
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const BookingModal = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext);
    const { title, sellingprice, _id } = product;
    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const location = form.location.value;
        const price = form.price.value;
        const productId = _id;
        const bookedproduct = {
            title,
            name,
            phone,
            email,
            location,
            price,
            productId,
            paid: false,
            image: product.image
        }

        fetch('https://laptop-bazar-server-psi.vercel.app/booking/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bookedproduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setProduct(null)
                    navigate('/dashboard')
                    toast.success('Booking Confirmed')
                }
                else {
                    setProduct(null)
                }
            })


    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>


                    {
                        user?.email ? <>
                            <h3 className="text-lg font-bold my-1">{title}</h3>
                            <form onSubmit={handleFormSubmit} className='grid grid-cols-1 gap-3 mt-8' >
                                <input type="text" name='price' defaultValue={sellingprice} className="input input-bordered w-full bg-slate-200" disabled />
                                <input type="text" name='name' defaultValue={user?.displayName} className="input input-bordered w-full " disabled />
                                <input type="email" name='email' defaultValue={user?.email} className="input input-bordered w-full " disabled />
                                <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full" />
                                <input type="text" name='location' placeholder="Meeting Location" className="input input-bordered w-full" />
                                <input type="submit" className='bg-info input input-bordered w-full text-white' />
                            </form>
                        </>
                            :
                            <button>Are you try for booking?<Link to='/login' className='text-secondary'>Please Login First.</Link></button>
                    }

                </div>
            </div>
        </div>
    );
};

export default BookingModal;