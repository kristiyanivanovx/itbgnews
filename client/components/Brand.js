import Image from 'next/image';
import logo from '../public/it-bg-logo.png';
import styles from '../styles/Brand.module.css';
import React from 'react';

const Brand = () => {
    return (
        <div className={styles.brand}>
<<<<<<< HEAD
            <Image
                className={styles.brand__logo}
                src={logo}
                width={'70px'}
                height={'70px'}
                alt={'logo'}
            />
=======
            <div className={styles.brand__logo}>
                <Image
                    src={logo}
                    alt={'logo'}
                />
            </div>
>>>>>>> Marina
            <div className={styles.brand__title}>
                <a href="#">IT-BG News</a>
            </div>
        </div>
    );
};

export default Brand;
