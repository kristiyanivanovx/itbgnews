import React from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

const MyProfile = () => {
    return (
        <>
            <HeadComponent currentPageName={'My Profile'} />
            <div className={'container'}>
                <div className={'col'}>
                    <Header />
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

MyProfile.getLayout = getDefaultLayout;

export default MyProfile;
