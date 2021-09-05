import React from 'react';
import LoginButton from '../components/LoginButton';
import styles from '../styles/Button.module.css';
import Image from "next/image";
import logo from '../public/it-bg-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faPlus, faUser, faClock, faComment, faChevronUp, faSearch} from '@fortawesome/free-solid-svg-icons';
import NavButton from "../components/NavButton";

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
            <div className={"container"}>
                <div className={"col"}>
                    <div className={"brand"}>
                        <Image className={"brand__logo"} src={logo} width={"70px"} height={"70px"}  alt={'logo'} />
                        <div className={"brand__title"}>IT-BG News</div>
                    </div>
                    <div className="search-bar">
                        <div className="search-bar__background">
                            <FontAwesomeIcon className={"icon__search"} icon={faSearch} />
                            {/*<NavButton />*/}
                            <input className="search-bar__input " />
                        </div>
                    </div>
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
