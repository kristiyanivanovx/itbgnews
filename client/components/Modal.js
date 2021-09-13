import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ shouldDisplay, text, toggleModal }) => {
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
            </div>
        </div>
    );
};

export default Modal;
