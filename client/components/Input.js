import styles from '../styles/Input.module.css';
import React from 'react';

export default function Input({ type, name, placeholder, onClick }) {
  return (
    <input
      onClick={onClick}
      name={name}
      type={type}
      placeholder={placeholder}
      className={styles.user__input}
    />
  );
}
