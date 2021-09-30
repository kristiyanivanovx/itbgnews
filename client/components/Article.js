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
import FormInput from './FormInput';
import ensureValidCookie from '../utilities/ensureValidCookie';
import { route } from 'next/dist/server/router';
import Input from './Input';

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
  const ENDPOINT = getEndpoint();
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
  const router = useRouter();

  useEffect(() => {
    if (shouldRedirectLogin) {
      router.push('/login');
      setShouldRedirectLogin((prev) => !prev);
    }
  }, [shouldRedirectLogin, router]);

  const toggleModalDelete = (message) => {
    setHasDeleteOption(() => true);
    setModalMessage(() => message);
    setShouldDisplayModal((shouldDisplay) => !shouldDisplay);
  };

  // delete
  const confirmDelete = async () => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return;
    }

    const response = await fetch(ENDPOINT + '/posts/delete/' + postId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
    });

    // todo: check for errors аnd set them
    // setErrors(() => result);
    checkResponseDelete(response);
  };

  const checkResponseDelete = (response) => {
    if (response.status === DELETED_RESPONSE_CODE) {
      setHasDeleteOption((hasDeleteOption) => !hasDeleteOption);
      setModalMessage(() => 'Новината беше успешно изтрита.');
      setTimeout(() => {
        setIsDeleted(() => true);
      }, 1000);
    }
  };

  // edit
  const toggleEditInputs = () => {
    setShouldDisplayEditInputs(
      (shouldDisplayEditInputs) => !shouldDisplayEditInputs,
    );
  };

  const confirmEdit = async () => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return;
    }

    const response = await fetch(ENDPOINT + '/posts/update/' + postId, {
      method: 'PATCH',
      body: JSON.stringify({ text: formText, url: formUrl }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
    });

    // todo: check for errors аnd set them
    // setErrors(() => result);
    await checkResponseEdit(response);
  };

  const checkResponseEdit = async (response) => {
    if (response.status === EDITED_RESPONSE_CODE) {
      const data = await response.json();

      setOriginalText(() => data.text);
      setOriginalUrl(() => data.url);
      setFormText(() => data.text);
      setFormUrl(() => data.url);
    }
  };

  // vote
  const upvote = async () => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return;
    }

    const response = await fetch(ENDPOINT + '/posts/upvote/' + postId, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
    });

    setShouldRotate(() => !shouldRotate);
    await checkResponseVote(response);
  };

  const checkResponseVote = async (response) => {
    const data = await response.json();
    const { count } = data;

    if (
      response.status === CREATED_RESPONSE_CODE ||
      response.status === REMOVED_RESPONSE_CODE
    ) {
      setUpvotesCount(() => count);
    } else if (response.status === UNAUTHORIZED_RESPONSE_CODE) {
      setShouldRedirectLogin(() => true);
    }
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
          <>
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
          </>
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
          <div className={styles.article__modify} onClick={toggleEditInputs}>
            <FontAwesomeIcon icon={faSave} onClick={confirmEdit} />
          </div>

          {shouldDisplayEditOptions ? (
            <>
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
          {comments} коментара
        </div>
      </div>
    </article>
  );
};

export default Article;
