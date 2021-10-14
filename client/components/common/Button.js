import styles from '../../styles/Button.module.css';
import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      <div className={styles.btn__background}> </div>
      <div className={styles.btn__shadow}> </div>
      <div className={styles.btn__text}>{text}</div>
    </button>
  );
}
