import React from 'react';

const Blog = () => {
    return (
        <div>
            <section className="">
                <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                    <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
                    <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Blog</h2>
                    <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
                        <details>
                            <summary className="py-2 outline-none cursor-pointer focus:underline">What are the different ways to manage a state in a React application??</summary>
                            <div className="px-4 pb-4">
                                <p>When we talk about state in our applications, it’s important to be clear about what types of state actually matter. <br />
                                    There are four main types of state you need to properly manage in your React apps: <br />
                                    *Local state
                                    *Global state
                                    *Server state
                                    *URL state</p>
                            </div>
                        </details>
                        <details>
                            <summary className="py-2 outline-none cursor-pointer focus:underline">How does prototypical inheritance work??</summary>
                            <div className="px-4 pb-4">
                                <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object. getPrototypeOf and Object</p>
                            </div>
                        </details>
                        <details>
                            <summary className="py-2 outline-none cursor-pointer focus:underline">What is a unit test? Why should we write unit tests?</summary>
                            <div className="px-4 pb-4 space-y-2">
                                <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                            </div>
                        </details>
                        <details>
                            <summary className="py-2 outline-none cursor-pointer focus:underline">React vs. Angular vs. Vue??</summary>
                            <div className="px-4 pb-4 space-y-2">
                                <p>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.</p>
                            </div>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;