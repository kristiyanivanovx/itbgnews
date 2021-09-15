import React from 'react';
import Image from 'next/image';
import profile from '../public/profile.png';
import styles from '../styles/Profile.module.css';

const Profile = ({
  username,
  bio,
  articles,
  commentsCount,
  likesCount,
  articlesCount,
  triggerConfirmation,
}) => {
  return (
    <main className={styles.profile}>
      <div className={styles.top__info}>
        <h2 className={styles.profile__title}>Моят Профил</h2>
        <button
          className={styles.exit__btn}
          onClick={(e) => triggerConfirmation(e)}
        >
          <div className={styles.exit__btn__shadow}> </div>
          <span className={styles.exit__btn__text}>Изход</span>
        </button>
      </div>

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
            <h3 className={styles.user__name}>{username}</h3>
          </div>
          <div className={styles.user__bio}>{bio}</div>
          <div className={styles.user__activities}>
            <div className={styles.user__activity}>
              <div>{likesCount}</div>
              <div>харесвания</div>
            </div>
            <div className={styles.user__activity}>
              <div>{commentsCount}</div>
              <div>коментара</div>
            </div>
            <div className={styles.user__activity}>
              <div>{articlesCount}</div>
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
