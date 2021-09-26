import Image from 'next/image';
import styles from '../styles/Brand.module.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../public/logo.png';

const Brand = () => {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  let icon = shouldDisplay ? faTimes : faBars;

  console.log(logo);
  return (
    <>
      <div className={styles.site__header}>
        <header className={styles.header__main}>
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
        </header>
      </div>
    </>
  );
};

export default Brand;
