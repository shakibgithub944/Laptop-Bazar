import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/AuthProvider';

const AddProduct = () => {
    // const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key
    const navigate = useNavigate();

    const { data: categorys = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/category');
            const data = await res.json();
            return data;
        }

    })

    const handleAddProduct = data => {
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(ImageData => {
                if (ImageData.success) {
                    console.log(ImageData.data.url);
                    const product = {
                        title: data.title,
                        email: data.email,
                        seller: user.displayName.toLowerCase(),
                        postdate: data.date,
                        category: data.category,
                        item: "available",
                        paid: false,
                        sellingprice: data.sellingprice,
                        originalprice: data.originalprice,
                        location: data.location,
                        number: data.number,
                        condition: data.condition,
                        description: data.description,
                        purchasetime: data.purchasetime,
                        image: ImageData.data.url
                    }
                    fetch('http://localhost:5000/addproduct', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.title} successfully added.`)
                            navigate('/dashboard/myproducts')
                        })

                }
            })
    }
    return (
        <div className='mx-5'>
            <h1 className="text-3xl font-bold my-4">Add Product</h1>
            <form onSubmit={handleSubmit(handleAddProduct)} className='grid md:grid-cols-3 lg:grid-cols-4 gap-2' >
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Product Title</span></label>
                    <input type="text"{...register("title", {
                        required: "Title is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.title && <p className='text-red-500'>{errors.title?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Selling Price</span></label>
                    <input type="text"{...register("sellingprice", {
                        required: "sellign price is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.sellignprice && <p className='text-red-500'>{errors.sellignprice?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Original Price</span></label>
                    <input type="text"{...register("originalprice", {
                        required: "Original price is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.originalprice && <p className='text-red-500'>{errors.originalprice?.message}</p>}
                </div>
                {/* <div className="form-control w-full">
                    <label className="label"><span className="label-text">Condition</span></label>
                    <input type="text"{...register("condition", {
                        required: "Condition is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.condition && <p className='text-red-500'>{errors.condition?.message}</p>}
                </div> */}
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea type="text"{...register("description", {
                        required: "Description is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.description && <p className='text-red-500'>{errors.description?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Location</span></label>
                    <input type="text"{...register("location", {
                        required: "Location is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.location && <p className='text-red-500'>{errors.location?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Phone number</span></label>
                    <input type="text"{...register("number", {
                        required: "Number is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.number && <p className='text-red-500'>{errors.number?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Post Date</span></label>
                    <input type="text"{...register("date", {
                        required: "Date is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.date && <p className='text-red-500'>{errors.date?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Year of Purchase</span></label>
                    <input type="text"{...register("purchasetime", {
                        required: "Purchase time is required."

                    })}
                        className="input input-bordered w-full" />
                    {errors.purchasetime && <p className='text-red-500'>{errors.purchasetime?.message}</p>}
                </div>
                <div className="form-control w-full mb-7">
                    <label className="label"><span className="label-text">Condition</span></label>
                    <select {...register("condition", {
                        required: "Select condition it's required."

                    })}
                        className="select select-bordered w-full max-w-xs">
                        <option selected>Good</option>
                        <option >Excelent</option>
                        <option >Fair</option>
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="email"{...register("email", {
                        required: "Email address is required."

                    })} defaultValue={user?.email}
                        className="input input-bordered w-full" readOnly />
                    {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input type="file"{...register("image", {
                        required: "Image is required."

                    })}
                        className="border mb-4 w-full" />
                    {errors.image && <p className='text-red-500'>{errors.image?.message}</p>}
                </div>
                <div className="form-control w-full mb-7">
                    <label className="label"><span className="label-text">Category</span></label>
                    <select {...register("category", {
                        required: "Select category it's required."

                    })}
                        className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select category</option>
                        {
                            categorys.map(category => <option
                                key={category.id}
                                value={category.brand}
                            >
                                {category.brand}</option>)
                        }
                    </select>
                </div>

                <div className=''>
                    <input type="submit" value={'Add Product'} className='btn btn-info w-full' />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;