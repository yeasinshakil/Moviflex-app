import React from 'react';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';

const Home = () => {
    return (
        <div>
            <HeroBanner />
            <Trending />
            <Popular />
        </div>
    );
};

export default Home;