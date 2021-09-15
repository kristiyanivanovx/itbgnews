import React, { useState } from 'react';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
  faChevronUp,
  faClock,
  faComment,
  faUser,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const Article = ({
  id,
  title,
  link,
  username,
  date,
  comments,
  upvotes,
  isFirstArticle,
  shouldDisplayEditAndDeleteButtons,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(1);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  function toggleModal() {
    setModalMessage(() => 'Новината беше успешно създадена!');
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  }

  let articleClasses = isFirstArticle
    ? `${styles.article__regular} ${styles.article__rounded}`
    : `${styles.article__regular}`;

  return (
    <article className={articleClasses}>
      <div className={styles.article__main}>
        <h2 className={styles.article__title}>
          <a href={link}>{title}</a>
        </h2>

        <Modal
          text={modalMessage}
          shouldDisplay={shouldDisplay}
          toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
        />

        {/* todo: implement functionality */}
        {/* todo: only show to user who created the current item */}
        {!shouldDisplayEditAndDeleteButtons ? (
          <>
            <div className={styles.article__edit}>
              <Link href={'/edit'}>
                <a>
                  <FontAwesomeIcon icon={faEdit} />
                </a>
              </Link>
            </div>
            <div className={styles.article__delete}>
              <Link href={{ pathname: '/delete', query: { id: id } }}>
                <a>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </a>
              </Link>
            </div>
          </>
        ) : null}

        <div
          className={`${styles.article__votes} ${styles.article__small__text}`}
        >
          <FontAwesomeIcon
            className={styles.article__votes__icon}
            icon={faChevronUp}
          />
          {upvotes} гласа
        </div>
      </div>
      <div
        className={`${styles.article__information} ${styles.article__small__text}`}
      >
        <div>
          <FontAwesomeIcon
            icon={faUser}
            className={styles.article__information__icon}
          />
          от {username}
        </div>
        <div>
          <FontAwesomeIcon
            icon={faClock}
            className={styles.article__information__icon}
          />
          <Link href={{ pathname: '/view', query: { post_id: id } }}>
            <a>{date}</a>
          </Link>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faComment}
            className={styles.article__information__icon}
          />
          {comments} коментара
        </div>
      </div>
    </article>
  );
};

export default Article;
