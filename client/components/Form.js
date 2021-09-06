import React from 'react';
import styles from '../styles/Form.module.css';

const Form = ({ children }) => {
    return <div className={styles.form__input}>{children}</div>;
};

export default Form;
