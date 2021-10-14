import React from 'react';
import styles from '../../styles/Auth.module.css';

const AuthContainer = ({ children }) => {
  return <div className={styles.auth__container}>{children}</div>;
};

export default AuthContainer;
