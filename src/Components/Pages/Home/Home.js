import React from 'react';
import Category from '../Category/Category';
import Header from '../Header/Header';
import AdvertiseItem from './AdvertiseItem/AdvertiseItem';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import Reviews from './Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Category></Category>
            <AdvertiseItem></AdvertiseItem>
            <Reviews></Reviews>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;