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
                                <img src="https://images.teamtalk.com/content/uploads/2022/07/16164503/germany-winger-leroy-sane.jpg" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
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
                                <img src="https://pbs.twimg.com/profile_images/1325024732182319104/p2i-OAZV_400x400.png" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
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
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO_HCmf5zkEvBFwt_hUZc3j6pkjMZosaM1TQ&usqp=CAU" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                            </div>
                            <div>
                                <h4 className="font-bold">Lara</h4>
                                <span className="text-xs text-gray-400">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="p-6 bg-info text-white mb-10">
                <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">500+</p>
                        <p className="text-xl">Sellers</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">89K</p>
                        <p className="text-xl">Users</p>
                    </div>
                    <div className="flex flex-col justify-center m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">300+</p>
                        <p className="text-xl">Daily orders</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Reviews;