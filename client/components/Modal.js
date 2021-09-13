import React from 'react';
import styles from '../styles/Modal.module.css';
<<<<<<< HEAD
import Link from 'next/link';

const Modal = ({ shouldDisplay, text, message, toggleModal }) => {
=======

const Modal = ({ shouldDisplay, text, toggleModal }) => {
>>>>>>> chris
    return (
        <div
            style={{ display: shouldDisplay ? 'block' : 'none' }}
            className={styles.modal}
        >
            <div className={styles.modal__content}>
                <button className={styles.close} onClick={toggleModal}>
                    &times;
                </button>
                <p>{text}</p>
<<<<<<< HEAD
                <div className={styles.login__text}>
                    <Link href={'/login'}>
                        <a>{message}</a>
                    </Link>
                </div>
=======
>>>>>>> chris
            </div>
        </div>
    );
};

export default Modal;
