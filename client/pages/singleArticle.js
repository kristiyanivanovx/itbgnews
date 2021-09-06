import React from 'react';
import Image from 'next/image';
import logo from '../public/it-bg-logo.png';
import styles from '../styles/SingleArticle.module.css';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import Comment from '../components/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faNewspaper,
    faPlus,
    faUser,
    faClock,
    faComment,
    faChevronUp,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

const SingleArticle = () => {
    return (
        <>
            <div className={'container'}>
                <div className={'col'}>
                    <div className={'brand'}>
                        <Image
                            className={'brand__logo'}
                            src={logo}
                            width={'70px'}
                            height={'70px'}
                            alt={'logo'}
                        />
                        <div className={'brand__title'}>IT-BG News</div>
                    </div>
                    <div className="search-bar">
                        <div className="search-bar__background">
                            <FontAwesomeIcon
                                className={'icon__search'}
                                icon={faSearch}
                            />
                            {/*<NavButton />*/}
                            <input className="search-bar__input " />
                        </div>
                    </div>
                </div>
                <div className={'col'}>
                    <SideNav />
                    <main className={'articles'}>
                        <section className="article__wrapper">
                            <Article
                                title={'Ивелин направи Binary Search???'}
                                upvotes={9}
                                username={'admin'}
                                hours={5}
                                comments={103}
                                link={'https://it-bg.github.io/%27%7D'}
                                isFirstArticle={true}
                            />
                            <div
                                className="comment-wrapper"
                                className={styles.comment__wrapper}
                            >
                                <Comment
                                    title={'Добре.'}
                                    upvotes={9}
                                    username={'admin'}
                                    hours={5}
                                    comments={103}
                                    tabs={1}
                                />
                            </div>
                            <div
                                className="comment-wrapper"
                                className={styles.comment__wrapper}
                            >
                                <Comment
                                    title={'Не е добре.'}
                                    upvotes={2}
                                    username={'Иван'}
                                    hours={1}
                                    comments={0}
                                    tabs={2}
                                />
                            </div>
                            <div
                                className="comment-wrapper"
                                className={styles.comment__wrapper}
                            >
                                <Comment
                                    title={'Нещо друго...'}
                                    upvotes={9}
                                    username={'Петър'}
                                    hours={2}
                                    comments={0}
                                    tabs={1}
                                />
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
};

export default SingleArticle;
