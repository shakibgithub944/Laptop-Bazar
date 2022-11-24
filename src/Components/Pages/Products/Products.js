import React from 'react';
import { useLoaderData } from 'react-router-dom'

const Products = () => {
    const products = useLoaderData();
    // console.log(products.length);
    return (
        <div>
            <h1 className='text-3xl text-center my-10'>Products</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10'>

                {
                    products.map(product => <div className="card w-96 glass">
                        <figure><img src={product.image} alt="car!" className='w-full h-64' /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.title}</h2>
                            <p>Detail: {product.description}</p>
                            <p>Post Date:{product.postdate}</p>
                            <p>Condition: {product.condition}</p>
                            <p>Location: {product.location}</p>
                            <p>Mobile: {product.number}</p>
                            <p>Buying Price: <del>{product.originalprice}$</del> </p>
                            <p>Selling Price: <b>{product.sellingprice}$</b></p>
                            <div className="card-actions justify-between">
                                <button className="btn btn-accent">Add wishList!</button>
                                <button className="btn btn-accent">Book now!</button>
                            </div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default Products;