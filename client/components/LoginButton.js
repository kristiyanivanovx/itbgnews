import styles from '../styles/Button.module.css';
import React from 'react';

export default function LoginButton() {
    return (
        <button className={styles.btn}>
            <div className={styles.backgroundBtn}> </div>
            <div className={styles.anotherBackgroundBtn}> </div>
            <div className={styles.text}></div>
        </button>
    );
}
