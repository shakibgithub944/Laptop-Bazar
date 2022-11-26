import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'

const Category = () => {

    const { data: categorys = [], refetch, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/category', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data
        }
    })


    return (
        <div className='my-12'>
            <h1 className='text-3xl text-center my-5'>Product Category</h1>
            <hr className='w-96 mx-auto' />

            <div className='grid lg:grid-cols-3 gap-5 mx-5'>
                {
                    categorys.map(category => <Link
                        key={category.id}
                        to={`/category-product/${category.brand}`}
                    >
                        <div
                            className="border text-center">
                            <p className='py-3 font-bold'>{category.brand}</p>

                        </div>
                    </Link>)
                }

            </div>

        </div>
    );
};

export default Category;