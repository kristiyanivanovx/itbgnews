import Image from 'next/image';
import logo from '../public/it-bg-logo.png';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className={`${styles.site__header} col`}>
            <FontAwesomeIcon className={styles.icon__burger} icon={faBars} />
            <div className={styles.brand}>
                <div className={styles.brand__logo}>
                    <Image src={logo} alt={'logo'} />
                </div>
                <div className={styles.brand__title}>
                    <a href="#">IT-BG News</a>
                </div>
            </div>

            <div className={styles.search__bar}>
                <FontAwesomeIcon
                    className={styles.icon__search}
                    icon={faSearch}
                />
                <input className={styles.search__bar__input} />
            </div>
        </header>
    );
};

export default Header;
