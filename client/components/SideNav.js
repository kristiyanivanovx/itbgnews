import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from '../styles/SideNav.module.css';
import Link from 'next/link';

const SideNav = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.nav__list}>
                <li className={styles.nav__item}>
                    <FontAwesomeIcon
                        className={styles.nav__icon}
                        icon={faNewspaper}
                    />
                    <Link href={'/'}>
                        <a>Всички Статии</a>
                    </Link>
                </li>
                <li className={styles.nav__item}>
                    <FontAwesomeIcon
                        className={styles.nav__icon}
                        icon={faPlus}
                    />
                    <Link href={'/create'}>
                        <a>Създай Статия</a>
                    </Link>
                </li>
                <li className={styles.nav__item}>
                    <FontAwesomeIcon
                        className={styles.nav__icon}
                        icon={faUser}
                    />
                    <Link href={'/myProfile'}>
                        <a>Моят Профил</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideNav;
