import React from 'react';
import LoginButton from '../components/LoginButton';
import styles from '../styles/Button.module.css';
import Image from "next/image";
import logo from '../public/it-bg-logo-2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faPlus, faUser, faClock, faComment, faChevronUp, faSearch} from '@fortawesome/free-solid-svg-icons';

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
                    <span><FontAwesomeIcon icon={faUser} />от admin</span>
                    <span><FontAwesomeIcon icon={faClock} />преди 5 часа</span>
                    <span><FontAwesomeIcon icon={faComment} />103 коментара</span>
                </div>
            </article>
        );
    }
    return (

        <>
            <div className={"container"}>
                <div>123
                    <div className={"brand"}>
                        <Image className={"brand__logo"} src={logo} width={"60px"} height={"60px"}  alt={'logo'} />
                        <span className={"brand__title"}>IT-BG News</span>
                    </div>
                    <div className="search-bar">
                        <div className="search-bar__background">
                            <FontAwesomeIcon icon={faSearch} />
                            <input className="search-bar__input" />
                        </div>
                    </div>
                </div>
                <div className={"col"}>
                    <nav className={"nav"}>
                        <ul className={"nav__list"}>
                            <li className={"nav__item"}><FontAwesomeIcon className={"nav__icons"} icon={faNewspaper} />Всички Статии</li>
                            <li className={"nav__item"}><FontAwesomeIcon className={"nav__icons"} icon={faPlus} />Създай Статия</li>
                            <li className={"nav__item"}><FontAwesomeIcon className={"nav__icons"} icon={faUser} />Моят Профил</li>
                        </ul>
                    </nav>
                    <main className={"articles"}>
                        <article className={"article__regular article__rounded "}>
                            <div className={"article__main"}>
                                <h2 className={"article__title"}>Ивелин 123 направи Binary Search???</h2>
                                <span className={"article__votes"}><FontAwesomeIcon className={"article__votes--icon"} icon={faChevronUp} />9 гласа</span>
                            </div>
                            <div className={"article__information"}>
                                <span><FontAwesomeIcon icon={faUser} />от admin</span>
                                <span><FontAwesomeIcon icon={faClock} />преди 5 часа</span>
                                <span><FontAwesomeIcon icon={faComment} />103 коментара</span>
                            </div>
                        </article>
                        {items}
                    </main>
                </div>
            </div>
        </>
    );
}
