import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Link from 'next/link';
import styles from '../styles/MobileNav.module.css';

const MobileNav = () => {
    return (
        <nav className={styles.mobile__nav}>
            <ul className={styles.mobile__nav__list}>
                <li className={styles.mobile__nav__item}>
                    <FontAwesomeIcon
                        className={styles.mobile__nav__icon}
                        icon={faNewspaper}
                    />
                    <Link href={'/'}>
                        <a>Всички Статии</a>
                    </Link>
                </li>
                <li className={styles.mobile__nav__item}>
                    <FontAwesomeIcon
                        className={styles.mobile__nav__icon}
                        icon={faPlus}
                    />
                    <Link href={'/create'}>
                        <a>Създай Статия</a>
                    </Link>
                </li>
                <li className={styles.mobile__nav__item}>
                    <FontAwesomeIcon
                        className={styles.mobile__nav__icon}
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

export default MobileNav;
