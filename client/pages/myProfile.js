import React from 'react';
import Brand from '../components/Brand';
import SearchBar from '../components/SearchBar';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { useCookies } from 'react-cookie';
import Router from 'next/router';

const MyProfile =  () => {
    const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);

    // todo: improve checks
    // if user doesnt have cookies, make him login
    if (cookies.access_token === undefined || cookies.refresh_token === undefined) {
        Router.push('/login').then();
    }

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
        </>
    );
};

MyProfile.getLayout = getDefaultLayout;

export default MyProfile;
