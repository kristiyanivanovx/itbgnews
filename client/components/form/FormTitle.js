import React from 'react';
import styles from '../../styles/Form.module.css';

const FormTitle = ({ text }) => {
  return <h2 className={styles.form__title}>{text}</h2>;
};

export default FormTitle;
