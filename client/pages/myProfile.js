import React, { useState } from 'react';
import Brand from '../components/Brand';
import SearchBar from '../components/SearchBar';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Article from '../components/Article';
import Articles from '../components/Articles';

const MyProfile = () => {
    return (
        <div>
            <div className={'container'}>
                <div className={'col'}>
                    <Brand />
                    <SearchBar />
                </div>
                <div className={'col'}>
                    <SideNav />
                    <Profile />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyProfile;
