import React from 'react';
import { useLoaderData } from 'react-router-dom'

const Products = () => {
    const products = useLoaderData();
    // console.log(products.length);
    return (
        <div>
            <h1 className='text-3xl '>Producs items here</h1>
        </div>
    );
};

export default Products;