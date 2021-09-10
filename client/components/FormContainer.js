import React from 'react';
import styles from '../styles/Form.module.css';

const FormContainer = ({ children }) => {
    return <div className={styles.form__container}>{children}</div>;
};

export default FormContainer;
