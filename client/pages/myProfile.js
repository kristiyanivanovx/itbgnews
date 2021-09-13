<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> chris
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
<<<<<<< HEAD
=======
import { useCookies } from 'react-cookie';
import Router, {useRouter} from 'next/router';

const MyProfile =  () => {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "accessToken"]);
    const router = useRouter();

    // if user doesnt have cookies, make him login
    // todo: improve checks
    // todo: use getServerSideProps / hoc
    useEffect(() => {
        if(!cookies || !router) {
            return;
        }

        const { refreshToken, accessToken } = cookies;
        if (refreshToken === undefined || accessToken === undefined) {
            router.push('/login');
        }

    }, [cookies, router])
>>>>>>> chris

    return (
        <>
            <HeadComponent currentPageName={'My Profile'}/>
            <div className={'container'}>
                <div className={'col'}>
<<<<<<< HEAD
                    <Header />
=======
                    <Header/>
>>>>>>> chris
                </div>
                <div className={'col'}>
                    <SideNav/>
                    <Profile/>
                </div>
            </div>
        </>
    );
};

MyProfile.getLayout = getDefaultLayout;

export default MyProfile;
