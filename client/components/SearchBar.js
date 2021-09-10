<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React from 'react';
>>>>>>> Marina
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Search.module.css';

const SearchBar = () => {
    return (
        <div className={styles.search__bar}>
<<<<<<< HEAD
            <div className={styles.search__bar__background}>
                <FontAwesomeIcon
                    className={styles.icon__search}
                    icon={faSearch}
                />
                <input className={styles.search__bar__input} />
            </div>
=======
            <FontAwesomeIcon className={styles.icon__search} icon={faSearch} />
            <input className={styles.search__bar__input} />
>>>>>>> Marina
        </div>
    );
};

export default SearchBar;
