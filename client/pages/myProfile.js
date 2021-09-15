import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import Footer from "../components/Footer";

import { useCookies } from 'react-cookie';
import Router, { useRouter } from 'next/router';
import { getEnvironmentInfo } from '../utilities/common';
import styles from '../styles/Profile.module.css';
import Article from '../components/Article';

const MyProfile = () => {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const [confirmation, setConfirmation] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'accessToken',
  ]);

  const triggerConfirmation = async (e) => {
    setConfirmation((confirmation) => confirmation + 1);

    // add confirmation class when clicked
    e.target.classList.add(styles.exit__btn__confirm);

    // todo: improve logout
    // if user has clicked more than one time, remove the cookies
    if (confirmation > 1) {
      // removeCookie("access_token");
      // removeCookie("refresh_token");
      await submitForm();
      //await Router.push('/');
    }
  };

  // todo: improve cookie sending
  const submitForm = async () => {
    const response = await fetch(ENDPOINT + '/logout', {
      method: 'POST',
      cookies: document.cookie,
    });

    let result = await response.json();
    console.log(result);

    // setErrors(() => result.data);
    // await checkResult(result);
  };

  const router = useRouter();

  // if user doesnt have cookies, make him login
  // temporarily commented out
  // todo: improve checks
  // todo: use getServerSideProps / hoc
  useEffect(() => {
    // if (!cookies || !router) { return; }

    const { refreshToken, accessToken } = cookies;
    // if (refreshToken === undefined || accessToken === undefined) {
    //   router.push('/login');
    // }
  }, [cookies, router]);

  const articles = [];
  for (let i = 0; i <= 4; i++) {
    articles.push(
      <Article
        isFirstArticle={i === 0}
        key={i}
        title={'Binary Search'}
        username={'admin'}
        date={new Date().toLocaleDateString('bg-BG')}
        upvotes={9}
        hours={5}
        comments={103}
        link={'https://it-bg.github.io/'}
      />,
    );
  }

  return (
    <>
      <HeadComponent currentPageName={'Моят Профил'} />
      <div className={'container'}>
        <div className={'col'}>
          <Header />
        </div>
        <div className={'col'}>
          <SideNav />
          <Profile
            triggerConfirmation={(e) => triggerConfirmation(e)}
            username={'Никола'}
            bio={'Да жиевее българия.'}
            articles={articles}
            commentsCount={50}
            likesCount={1920}
            articlesCount={3}
          />
        </div>
      </div>
    </>
  );
};

MyProfile.getLayout = getDefaultLayout;

export default MyProfile;
