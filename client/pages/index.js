import React from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import SearchBar from '../components/SearchBar';
import Brand from '../components/Brand';
import Footer from '../components/Footer';
import HeadComponent from '../components/HeadComponent';

export default function Home() {
    let key = 0;
    const items = [
        <Article
            key={key}
            title={'Ивелин направи Binary Search???'}
            upvotes={9}
            username={'admin'}
            hours={5}
            comments={103}
            link={'https://it-bg.github.io/'}
            isFirstArticle={true}
        />,
    ];

    key++;
    for (let i = key; i < 4; i++) {
        items.push(
            <Article
                key={key}
                title={'123'}
                upvotes={9}
                username={'admin'}
                hours={5}
                comments={103}
                link={'https://it-bg.github.io/'}
            />,
        );
    }

    return (
        <>
            <HeadComponent currentPageName={'All Articles'} />
            <div className={'container'}>
                <div className={'col'}>
                    <Brand />
                    <SearchBar />
                </div>
                <div className={'col'}>
                    <SideNav />
                    <main className={'articles'}>{items}</main>
                </div>
            </div>
        </>
    );
}

Home.getLayout = getDefaultLayout;

export default Home;
