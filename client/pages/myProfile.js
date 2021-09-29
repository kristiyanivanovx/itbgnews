import React from 'react';
import Brand from '../components/Brand';
import SearchBar from '../components/SearchBar';
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
