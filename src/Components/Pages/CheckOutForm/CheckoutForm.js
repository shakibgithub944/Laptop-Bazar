import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ bookedproduct }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [transectionId, setTransectionId] = useState('')
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");

    const { price, title, email, _id, productId } = bookedproduct;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('https://laptop-bazar-server-psi.vercel.app/create-payment-intent', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')
        }
        setProcessing(true);

        const { paymentIntent, errorConfirm } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: title,
                        email: email,
                    },
                },
            },
        );
        if (errorConfirm) {
            setCardError(errorConfirm.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {

            const payment = {
                bookingId: _id,
                price,
                email,
                productId,
                transectionId: paymentIntent.id
            }
            fetch('https://laptop-bazar-server-psi.vercel.app/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Congratulations , Your payment done.')
                        setTransectionId(paymentIntent.id)
                        navigate('/dashboard')
                    }

                })

        }
        setProcessing(false)


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-info text-white my-2'
                    type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            <p className=''>TxId:{transectionId}</p>
        </>
    );
};

export default CheckoutForm;