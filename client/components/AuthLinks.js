import styles from '../styles/Auth.module.css';
import React from 'react';
import Link from 'next/link';

const AuthLinks = ({ firstText, secondText }) => {
  return (
    <div className={styles.auth__links}>
      <span className={styles.auth__link}>
        <Link href={'/register'}>
          <a> {firstText}</a>
        </Link>
      </span>
      <span className={styles.auth__link}>
        <Link href={'/forgotten'}>
          <a>{secondText}</a>
        </Link>
      </span>
    </div>
  );
};

export default AuthLinks;
