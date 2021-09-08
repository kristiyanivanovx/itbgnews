import React from 'react';
import styles from '../styles/SingleArticle.module.css';
import Article from '../components/Article';
import Comment from '../components/Comment';
import Brand from '../components/Brand';
import SearchBar from '../components/SearchBar';
import SideNav from '../components/SideNav';
import HeadComponent from '../components/HeadComponent';
import Footer from '../components/Footer';
import getDefaultLayout from '../utilities/getDefaultLayout';

const SingleArticle = () => {
    return (
        <>
            <HeadComponent currentPageName={'Article #ID'} />
            <div className={'container'}>
                <div className={'col'}>
                    <Brand />
                    <SearchBar />
                </div>
                <div className={'col'}>
                    <SideNav />
                    <main className={'articles'}>
                        <section className="article__wrapper">
                            <Article
                                title={'Ех този Binary Search!'}
                                upvotes={9}
                                username={'admin'}
                                hours={5}
                                comments={103}
                                link={'https://it-bg.github.io/'}
                                isFirstArticle={true}
                            />
                            <div className={styles.comment__wrapper}>
                                <Comment
                                    title={'Добре.'}
                                    upvotes={19}
                                    username={'admin'}
                                    hours={6}
                                    comments={163}
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

SingleArticle.getLayout = getDefaultLayout;

export default SingleArticle;
