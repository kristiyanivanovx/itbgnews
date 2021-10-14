import React from 'react';
import styles from '../../styles/NavButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavButton = () => {
  return (
    <div className={styles.bars}>
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};

export default NavButton;
