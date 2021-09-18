import styles from '../styles/Form.module.css';
import React from 'react';

export default function Input({
  defaultValue,
  type,
  name,
  placeholder,
  onChange,
  errorMessage,
}) {
  let hasError = errorMessage != null;

  let errorMessageBorder = hasError
    ? `${styles.user__input} ${styles.user__input__error}`
    : styles.user__input;

  let errorMessageFormatted = hasError ? (
    <span className={styles.user__input__error__text}>{errorMessage}</span>
  ) : null;

  // className={styles.user__input}
  return (
    <>
      <input
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        className={errorMessageBorder}
      />
      {errorMessageFormatted}
    </>
  );
}
