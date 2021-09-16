import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({
  text,
  shouldDisplay,
  toggleModal,
  hasDeleteOption,
  confirmOptionText,
  cancelOptionText,
  confirmDelete,
}) => {
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
        {hasDeleteOption ? (
          <>
            <a onClick={confirmDelete} className={styles.options__text}>
              {confirmOptionText}
            </a>
            <a onClick={toggleModal} className={styles.options__text}>
              {cancelOptionText}
            </a>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
