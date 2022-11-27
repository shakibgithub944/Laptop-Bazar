import React from 'react';
import contactImg from '../../../assets/contact.jpg'

const Contact = () => {
    return (
        <div>
            <h1 className="text-center text-3xl my-5">Get In Touch</h1>
            <hr className='w-96 mx-auto' />
            <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 ">
                <div className="flex flex-col justify-center items-center ">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let's talk!</h2>
                        <div className="">Any question to Laptop-Bazar?</div>
                    </div>
                    <img src={contactImg} alt="" className="p-6 h-52 md:h-64" />
                </div>
                <form novalidate="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div>
                        <label for="name" className="text-sm">Full name</label>
                        <input id="name" type="text" placeholder="" className="w-full p-3 rounded input input-bordered" />
                    </div>
                    <div>
                        <label for="email" className="text-sm">Email</label>
                        <input id="email" type="email" className="w-full p-3 rounded input input-bordered" />
                    </div>
                    <div>
                        <label for="message" className="text-sm">Message</label>
                        <textarea id="message" rows="3" className="w-full p-3 rounded input input-bordered"></textarea>
                    </div>
                    <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-info text-white">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;