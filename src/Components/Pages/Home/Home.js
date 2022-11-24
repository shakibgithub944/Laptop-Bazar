import React from 'react';
import Category from '../Category/Category';
import Header from '../Header/Header';
import AdvertiseItem from './AdvertiseItem/AdvertiseItem';
import Footer from './Footer/Footer';
import Reviews from './Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Category></Category>
            <AdvertiseItem></AdvertiseItem>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;