import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom'
import CheckoutForm from '../CheckOutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIP_KEY);

const Payment = () => {
    const bookedproduct = useLoaderData();

    const { title, price } = bookedproduct
    return (
        <div className='p-5'>
            <h1 className='text-3xl mt-10'>Payment for <span className='text-info'>{title}</span></h1>
            <p className="text-xl mt-2">Please pay <strong className='text-success'>${price}</strong></p>

            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                    bookedproduct={bookedproduct}
                    >

                    </CheckoutForm>

                </Elements>
            </div>

        </div>
    )
};

export default Payment;