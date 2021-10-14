import styles from '../../styles/Auth.module.css';
import React from 'react';

//firstText, firstLink, secondText, secondLink
const AuthLinks = ({ children }) => {
  return <div className={styles.auth__links}>{children}</div>;
};

export default AuthLinks;
