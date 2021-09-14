import React, { useState } from 'react';
import Image from 'next/image';
import profile from '../public/profile.png';
import styles from '../styles/Profile.module.css';
import Article from './Article';
import { useCookies } from 'react-cookie';
import Router from 'next/router';
import { getEnvironmentInfo } from '../utilities/common';

const Profile = () => {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const [confirmation, setConfirmation] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  const triggerConfirmation = async (e) => {
    setConfirmation((confirmation) => confirmation + 1);

    // add confirmation class when clicked
    e.target.classList.add(styles.exit__btn__confirm);

    // if user has clicked more than one time, remove the cookies
    if (confirmation > 1) {
      // removeCookie("access_token");
      // removeCookie("refresh_token");
      await submitForm();
      //await Router.push('/');
    }
  };

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

  const articles = [];
  for (let i = 0; i <= 4; i++) {
    articles.push(
      <Article
        isFirstArticle={i === 0}
        key={i}
        title={'Binary Search'}
        upvotes={9}
        username={'admin'}
        hours={5}
        comments={103}
        link={'https://it-bg.github.io/'}
      />,
    );
  }

  return (
    <main className={styles.profile}>
      <h2 className={styles.profile__title}>Моят Профил</h2>
      <div className={styles.profile__information}>
        <div className={styles.user__profile__pic}>
          <Image
            className={styles.profile__pic}
            src={profile}
            alt={'profile picture'}
          />
        </div>
        <div className={styles.user__information}>
          <div className={styles.profile__top}>
            <h3 className={styles.user__name}>Никола</h3>
            <button
              onClick={async (e) => await triggerConfirmation(e)}
              className={styles.exit__btn}
            >
              <div className={styles.exit__btn__shadow}> </div>
              <span className={styles.exit__btn__text}>Изход</span>
            </button>
          </div>

          <div className={styles.user__bio}>Да жиевее българия.</div>
          <div className={styles.user__activities}>
            <div className={styles.user__activity}>
              <div>1942</div>
              <div>харесвания</div>
            </div>
            <div className={styles.user__activity}>
              <div>50</div>
              <div>коментари</div>
            </div>
            <div className={styles.user__activity}>
              <div>3</div>
              <div>статии</div>
            </div>
          </div>
        </div>
      </div>
      <div>{articles}</div>
    </main>
  );
};

export default Profile;
