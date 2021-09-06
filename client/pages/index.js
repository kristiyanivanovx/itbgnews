import React from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import SearchBar from '../components/SearchBar';
import Brand from '../components/Brand';
import Footer from '../components/Footer';
import HeadComponent from '../components/HeadComponent';

export default function Home() {
    const items = [];

    for (let i = 0; i < 4; i++) {
        items.push(
            <article key={i} className={"article__regular"}>
                <div className={"article__main"}>
                    <h2 className={"article__title"}>Ивелин направи Binary Search???</h2>
                    <span className={"article__votes"}><FontAwesomeIcon className={"article__votes--icon"} icon={faChevronUp} />9 гласа</span>
                </div>
                <div className={"article__information"}>
                    <span><FontAwesomeIcon icon={faUser} className={"article__information__icon"} />от admin</span>
                    <span><FontAwesomeIcon icon={faClock} className={"article__information__icon"}/>преди 5 часа</span>
                    <span><FontAwesomeIcon icon={faComment} className={"article__information__icon"}/>103 коментара</span>
                </div>
            </article>
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
