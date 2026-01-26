import React from 'react';
import Banner from './Banner';
import PopularContests from './PopularContests';
import WinnerSection from './WinnerSection';
import ExtraSection from './ExtraSection';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Banner></Banner>
            <PopularContests></PopularContests>
            <WinnerSection></WinnerSection>
            <ExtraSection></ExtraSection>
        </div>
    );
};

export default Home;