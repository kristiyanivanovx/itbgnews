import styles from '../styles/Auth.module.css';
import React from 'react';

export default function Input({ type, name, placeholder }) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            className={styles.user__input}
        />
    );
}
