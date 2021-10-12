import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
  faSave,
  faChevronUp,
  faClock,
  faComment,
  faUser,
  faEdit,
  faReply,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { useRouter } from 'next/router';
import {
  UNAUTHORIZED_RESPONSE_CODE,
  REMOVED_RESPONSE_CODE,
  CREATED_RESPONSE_CODE,
  DELETED_RESPONSE_CODE,
  EDITED_RESPONSE_CODE,
  getEndpoint,
} from '../utilities/common';
import ensureValidCookie from '../utilities/ensureValidCookie';
import Input from './Input';
import isTokenPresent from '../helpers/isTokenPresent';
import {
  deleteArticle,
  deleteComment,
  editArticle,
  upvoteArticle,
} from './redux';
import { useDispatch, useSelector } from 'react-redux';

const Article = ({
  postId,
  isFirstArticle,
  title,
  upvotes,
  username,
  date,
  comments,
  link,
  userId,
  authorId,
  shouldDisplayReplyIcon,
  shouldDisplayEditOptions,
  accessToken,
  changeReplyingTo,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  const [shouldDisplayEditInputs, setShouldDisplayEditInputs] = useState(false);
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [hasDeleteOption, setHasDeleteOption] = useState(false);
  const [shouldRedirectLogin, setShouldRedirectLogin] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [upvotesCount, setUpvotesCount] = useState(upvotes);
  const [formText, setFormText] = useState(title);
  const [formUrl, setFormUrl] = useState(link);
  const [originalText, setOriginalText] = useState(title);
  const [originalUrl, setOriginalUrl] = useState(link);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (shouldRedirectLogin) {
      router.push('/login');
      setShouldRedirectLogin((prev) => !prev);
    }
  }, [shouldRedirectLogin, router]);

  const toggleEditInputs = () => {
    setShouldDisplayEditInputs(
      (shouldDisplayEditInputs) => !shouldDisplayEditInputs,
    );
  };

  const toggleModalDelete = (message) => {
    setHasDeleteOption(() => true);
    setModalMessage(() => message);
    setShouldDisplayModal((shouldDisplay) => !shouldDisplay);
  };

  // delete
  const confirmDelete = async () => {
    let token = await ensureValidCookie(accessToken);

    dispatch(deleteArticle(postId, token)).then(() => {
      setHasDeleteOption((hasDeleteOption) => !hasDeleteOption);
      setModalMessage(() => 'Новината беше успешно изтрита.');

      setTimeout(() => {
        setIsDeleted(() => true);
      }, 1000);

      // todo: check for errors аnd set them
      // setErrors(() => result);
    });
  };

  // edit
  const confirmEdit = async () => {
    let token = await ensureValidCookie(accessToken);

    dispatch(editArticle(postId, formText, formUrl, token)).then(() => {
      let article = article.article;
      console.log('let article = article.article');
      console.log(article);

      // todo: check for errors аnd set them
      // setErrors(() => result);

      if (article) {
        setOriginalText(() => article.text);
        setOriginalUrl(() => article.url);
        setFormText(() => article.text);
        setFormUrl(() => article.url);
      }
    });
  };

  // vote
  const upvote = async () => {
    isTokenPresent(accessToken, setShouldRedirectLogin);
    const token = await ensureValidCookie(accessToken);

    dispatch(upvoteArticle(postId, token)).then(() => {
      const count = article.article.count;
      setUpvotesCount(() => count);
      // setShouldRotate(() => !shouldRotate);
    });
  };

  const articleClasses = isFirstArticle
    ? `${styles.article__regular} ${styles.article__rounded}`
    : `${styles.article__regular}`;

  return (
    <article
      className={articleClasses}
      style={{ display: isDeleted ? 'none' : 'flex' }}
    >
      <div
        className={
          shouldDisplayEditInputs
            ? `${styles.article__main} ${styles.article__main__column}`
            : styles.article__main
        }
      >
        {shouldDisplayEditInputs ? (
          <div className={styles.article__inputs__wrapper}>
            <Input
              defaultValue={originalText}
              onChange={(e) => setFormText(e.target.value)}
            />
            <Input
              defaultValue={originalUrl}
              onChange={(e) => setFormUrl(e.target.value)}
            />
          </div>
        ) : (
          <h2 className={styles.article__title}>
            <a href={originalUrl}>{originalText}</a>
          </h2>
        )}
        <Modal
          text={modalMessage}
          shouldDisplay={shouldDisplayModal}
          toggleModal={(shouldDisplay) => setShouldDisplayModal(!shouldDisplay)}
          hasDeleteOption={hasDeleteOption}
          confirmOptionText={'Да'}
          cancelOptionText={'Не'}
          confirmDelete={confirmDelete}
        />
        <div
          className={
            shouldDisplayEditInputs
              ? `${styles.article__icons} ${styles.article__icons__edit}`
              : styles.article__icons
          }
        >
          {shouldDisplayEditOptions ? (
            <>
              {shouldDisplayEditInputs ? (
                <div
                  className={styles.article__modify}
                  onClick={async () => {
                    await confirmEdit();
                    toggleEditInputs();
                  }}
                >
                  <FontAwesomeIcon icon={faSave} />
                </div>
              ) : null}
              <div
                className={styles.article__modify}
                onClick={toggleEditInputs}
              >
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div
                className={styles.article__modify}
                onClick={() =>
                  toggleModalDelete(
                    'Сигурни ли сте, че искате да изтриете тази статия?',
                  )
                }
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            </>
          ) : null}
          {shouldDisplayReplyIcon ? (
            <div
              className={styles.article__modify}
              onClick={() => changeReplyingTo(postId, true)}
            >
              <FontAwesomeIcon icon={faReply} />{' '}
            </div>
          ) : null}
          <div
            onClick={async () => await upvote()}
            className={`${styles.article__votes} ${styles.article__small__text} `}
          >
            <FontAwesomeIcon
              className={`${styles.article__votes__icon} ${
                shouldRotate ? styles.rotated : ''
              }`}
              icon={faChevronUp}
            />
            {upvotesCount} гласа
          </div>
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
          <Link href={{ pathname: '/view', query: { name: formText, postId } }}>
            <a>{new Date(date).toLocaleDateString('bg-BG')}</a>
          </Link>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faComment}
            className={styles.article__information__icon}
          />
          <Link href={{ pathname: '/view', query: { name: formText, postId } }}>
            <a>{comments} коментара</a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Article;
