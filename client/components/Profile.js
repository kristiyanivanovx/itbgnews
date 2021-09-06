import React from 'react';
import Image from 'next/image';
import profile from '../public/profile.png';
import styles from '../styles/Profile.module.css';
import Article from './Article';
import Articles from './Articles';

const Profile = () => {
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
                        <button className={styles.exit__btn}>
                            <div className={styles.exit__btn__background}>
                                {' '}
                            </div>
                            <div className={styles.exit__btn__shadow}> </div>
                            <div className={styles.exit__btn__text}>Изход</div>
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
            <div>
                <Article
                    title={'Binary Search'}
                    upvotes={9}
                    username={'admin'}
                    hours={5}
                    comments={103}
                    link={'https://it-bg.github.io/'}
                    isFirstArticle={true}
                />
                <Article
                    title={'Binary Search'}
                    upvotes={9}
                    username={'admin'}
                    hours={5}
                    comments={103}
                    link={'https://it-bg.github.io/'}
                    isFirstArticle={true}
                />
                <Article
                    title={'Binary Search'}
                    upvotes={9}
                    username={'admin'}
                    hours={5}
                    comments={103}
                    link={'https://it-bg.github.io/'}
                    isFirstArticle={true}
                />
            </div>
        </main>
    );
};

export default Profile;
