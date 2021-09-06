import styles from '../styles/Auth.module.css';
import React from 'react';

const AuthLinks = ({ firstText, secondText }) => {
    return (
        <div className={styles.auth__links}>
            <span className={styles.auth__link}>{firstText}</span>
            <span className={styles.auth__link}>{secondText}</span>
        </div>
    );
};

export default AuthLinks;
