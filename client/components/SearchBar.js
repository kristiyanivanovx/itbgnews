<<<<<<< HEAD
<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React from 'react';
>>>>>>> Marina
=======
import React from 'react';
>>>>>>> chris
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Search.module.css';

// <FontAwesomeIcon className={styles.icon__search} icon={faSearch} />
// <input className={styles.search__bar__input} />
const SearchBar = () => {
    return (
        <div className={styles.search__bar}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> chris
            <div className={styles.search__bar__background}>
                <FontAwesomeIcon
                    className={styles.icon__search}
                    icon={faSearch}
                />
                <input className={styles.search__bar__input} />
            </div>
<<<<<<< HEAD
=======
            <FontAwesomeIcon className={styles.icon__search} icon={faSearch} />
            <input className={styles.search__bar__input} />
>>>>>>> Marina
=======
>>>>>>> chris
        </div>
    );
};

export default SearchBar;
