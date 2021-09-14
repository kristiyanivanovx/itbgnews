import React from 'react';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faClock,
  faComment,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Article = ({
  title,
  link,
  username,
  date,
  comments,
  upvotes,
  isFirstArticle,
}) => {
  let articleClasses = '';

  if (isFirstArticle) {
    articleClasses = `${styles.article__regular} ${styles.article__rounded}`;
  } else {
    articleClasses = `${styles.article__regular}`;
  }

  return (
    <article className={articleClasses}>
      <div className={styles.article__main}>
        <h2 className={styles.article__title}>
          <a href={link}>{title}</a>
        </h2>
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
          <Link href={'/view'}>
            {/*<a>преди {hours} часа</a>*/}
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
