import React from 'react';
import Banner from './Banner';
import PopularContests from './PopularContests';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Banner></Banner>
            <PopularContests></PopularContests>
        </div>
    );
};

export default Home;