import styles from '../styles/Form.module.css';
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
