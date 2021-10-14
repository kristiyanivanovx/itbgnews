import React from 'react';
import styles from '../../styles/Articles.module.css';

const Articles = ({ children }) => {
  return <main className={styles.articles}>{children}</main>;
};

export default Articles;
