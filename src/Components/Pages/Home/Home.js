import React from 'react';
import Header from '../Header/Header';
import AdvertiseItem from './AdvertiseItem/AdvertiseItem';
import Footer from './Footer/Footer';
import Reviews from './Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <h1>This is Category</h1>
            <AdvertiseItem></AdvertiseItem>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;