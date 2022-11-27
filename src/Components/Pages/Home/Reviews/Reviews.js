import React from 'react';

const Reviews = () => {
    return (
        <>
            <h1 className="text-center text-3xl my-5">Our Client Reviews</h1>
            <hr className='w-96 mx-auto' />
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 my-16'>
                <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 shadow-lg ">
                    <div className="p-4 space-y-2 text-sm text-gray-400">
                        <p>“We will share this with the store team to let them know how we are doing.” </p>
                    </div>
                    <div className="flex justify-between p-4">
                        <div className="flex space-x-4">
                            <div>
                                <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                            </div>
                            <div>
                                <h4 className="font-bold">Leroy</h4>
                                <span className="text-xs text-gray-400">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 shadow-lg ">
                    <div className="p-4 space-y-2 text-sm text-gray-400">
                        <p>“I just want to say that i find your product to be so amazing. Thank so much for providing great feature here, and keep it up.” </p>
                    </div>
                    <div className="flex justify-between p-4">
                        <div className="flex space-x-4">
                            <div>
                                <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                            </div>
                            <div>
                                <h4 className="font-bold">Jenkins</h4>
                                <span className="text-xs text-gray-400">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 shadow-lg ">
                    <div className="p-4 space-y-2 text-sm text-gray-400">
                        <p> “Thank you so much for Giving me the nice product. This products packaging is very nice.”</p>
                    </div>
                    <div className="flex justify-between p-4">
                        <div className="flex space-x-4">
                            <div>
                                <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                            </div>
                            <div>
                                <h4 className="font-bold">Lara</h4>
                                <span className="text-xs text-gray-400">2 days ago</span>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </>
    );
};

export default Reviews;