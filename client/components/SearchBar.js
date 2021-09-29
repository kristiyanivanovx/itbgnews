import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Search.module.css';

const SearchBar = () => {
  return (
    <div className={styles.search__bar}>
      <FontAwesomeIcon className={styles.search__icon} icon={faSearch} />
      <input className={styles.search__bar__input} />
    </div>
  );
};

export default SearchBar;
