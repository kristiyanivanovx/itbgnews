import React, { useEffect } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { useCookies } from 'react-cookie';
import Router, { useRouter } from 'next/router';


const MyProfile = () => {
    const [cookies, setCookie, removeCookie] = useCookies([
        'accessToken',
        'accessToken',
    ]);
    const router = useRouter();

    // if user doesnt have cookies, make him login
    // todo: improve checks
    // todo: use getServerSideProps / hoc
    useEffect(() => {
        if (!cookies || !router) {
            return;
        }

        const { refreshToken, accessToken } = cookies;
        if (refreshToken === undefined || accessToken === undefined) {
            router.push('/login');
        }
    }, [cookies, router]);

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
        </>
    );
};

MyProfile.getLayout = getDefaultLayout;

export default MyProfile;
