import styles from '../../styles/Auth.module.css';
import Link from 'next/link';
import React from 'react';

const AuthLink = ({ link, text }) => {
  return (
    <>
      <span className={styles.auth__link}>
        <Link href={link}>
          <a>{text}</a>
        </Link>
      </span>
    </>
  );
};

export default AuthLink;
