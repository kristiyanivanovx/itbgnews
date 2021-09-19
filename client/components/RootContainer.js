import React, { useEffect, useState } from 'react';
import styles from '../styles/RootContainer.module.css';

const RootContainer = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default RootContainer;
