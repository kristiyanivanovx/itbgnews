import React, { useState } from 'react';
import Image from "next/image";
import profile from "../public/profile.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faNewspaper, faPlus, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import logo from "../public/it-bg-logo.png";


const MyProfile = () => {
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
                <main className={"my-profile"}>
                    <h2 className={"my-profile__title"}>Моят Профил</h2>
                    <div className={"my-profile__information"}>
                        <div className={"user__profile-pic"}>
                            <Image className={"profile-pic"} src={profile}  alt={'profile pic'} />

                        </div>
                        <div className={"user__information"}>
                            <div className={"profile-top"}>
                                <h3 className={"user__name"}>Никола</h3>
                                <button className={"exit__btn"}>
                                    <div className={"exit__btn--background"}>
                                    </div>
                                    <div className={"exit__btn--shadow"}>
                                    </div>
                                    <div className={"exit__btn--text"}>Изход</div>
                                </button>
                            </div>
                            <div className={"user__bio"}>Да жиевее българия.</div>
                            <div className={"user__activities"}>
                                <div className={"user__activity"}>
                                    <div>1942</div>
                                    <div>харесвания</div>
                                </div>
                                <div className={"user__activity"}>
                                    <div>50</div>
                                    <div>коментари</div>
                                </div>
                                <div className={"user__activity"}>
                                    <div>3</div>
                                    <div>статии</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            </div>
        </>
    );
};

export default MyProfile;
