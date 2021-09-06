import React from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import SearchBar from '../components/SearchBar';
import Brand from '../components/Brand';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

function Home() {
    let key = 0;
    const items = [
        <Article
            key={key}
            title={'Binary Search. ' + key}
            upvotes={9}
            username={'admin'}
            hours={5}
            comments={103}
            link={'https://it-bg.github.io/'}
            isFirstArticle={true}
        />,
    ];

    for (let i = key + 1; i < 4; i++) {
        items.push(
            <Article
                key={i}
                title={'Merge Sort. ' + i}
                upvotes={9 + i}
                username={'admin'}
                hours={5 + i}
                comments={103 + i}
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
                <div className={"col"}>
                    <nav className={"nav"}>
                        <ul className={"nav__list"}>
                            <li className={"nav__item"}><FontAwesomeIcon className={"nav__icon"} icon={faNewspaper} />Всички Статии</li>
                            <li className={"nav__item"}><FontAwesomeIcon className={"nav__icon"} icon={faPlus} />Създай Статия</li>
                            <li className={"nav__item"}><FontAwesomeIcon className={"nav__icon"} icon={faUser} />Моят Профил</li>
                        </ul>
                    </nav>
                    <main className={"articles"}>
                        <article className={"article__regular article__rounded "}>
                            <div className={"article__main"}>
                                <h2 className={"article__title"}>Ивелин направи Binary Search???</h2>
                                <div className={"article__votes"}><FontAwesomeIcon className={"article__votes--icon"} icon={faChevronUp} />9 гласа</div>
                            </div>
                            <div className={"article__information"}>
                                <div><FontAwesomeIcon icon={faUser} className={"article__information__icon"}/>от admin</div>
                                <div><FontAwesomeIcon icon={faClock} className={"article__information__icon"}/>преди 5 часа</div>
                                <div><FontAwesomeIcon icon={faComment} className={"article__information__icon"}/>103 коментара</div>
                            </div>
                        </article>
                        {items}
                    </main>
                </div>
            </div>
        </>
    );
}

Home.getLayout = getDefaultLayout;

export default Home;
