import React, { useState } from 'react';
import Brand from '../components/Brand';
import SearchBar from '../components/SearchBar';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Article from '../components/Article';
import Articles from '../components/Articles';
import HeadComponent from '../components/HeadComponent';

const MyProfile = () => {
    return (
        <>
            <HeadComponent currentPageName={'My Profile'} />
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
        </>
    );
};

export default MyProfile;
