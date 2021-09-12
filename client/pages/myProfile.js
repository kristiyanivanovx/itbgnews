import React from 'react';
import Brand from '../components/Brand';
import SearchBar from '../components/SearchBar';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { useCookies } from 'react-cookie';
import Router, {useRouter} from 'next/router';

const MyProfile =  () => {
    const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "accessToken"]);
    const router = useRouter();

    // todo: improve checks
    // if user doesnt have cookies, make him login
    const { refreshToken, accessToken } = cookies;
    // if (refreshToken === undefined || accessToken === undefined) {
    //     React.push('/login');
    // }

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
