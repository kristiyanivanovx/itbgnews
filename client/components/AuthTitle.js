import React from 'react';
import styles from '../styles/Auth.module.css';

const AuthTitle = ({ text }) => {
  return <h2 className={styles.auth__title}>{text}</h2>;
};

export default AuthTitle;
