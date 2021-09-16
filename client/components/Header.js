import Image from 'next/image';
import logo from '../public/it-bg-logo.png';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileNav from './MobileNav';
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  let icon = shouldDisplay ? faTimes : faBars;

  const toggleNavigation = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  return (
    <header className={`${styles.site__header} col`}>
      <FontAwesomeIcon
        onClick={() => toggleNavigation()}
        className={styles.icon__burger}
        icon={icon}
      />
      <div className={styles.brand}>
        <div className={styles.brand__logo}>
          <Image src={logo} alt={'logo'} />
        </div>
        <div className={styles.brand__title}>
          <Link href={'/'}>
            <a>IT-BG News</a>
          </Link>
        </div>
      </div>

      {shouldDisplay ? (
        <MobileNav />
      ) : (
        <div className={styles.search__bar}>
          <FontAwesomeIcon className={styles.icon__search} icon={faSearch} />
          <input className={styles.search__bar__input} />
        </div>
      )}
    </header>
  );
};

export default Header;
