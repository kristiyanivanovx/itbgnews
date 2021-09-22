import React, { useEffect, useState } from 'react';
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
import Input from './Input';
import isTokenExpired from '../utilities/isTokenExpired';
import renewToken from '../utilities/refreshToken';
import jwt from 'jsonwebtoken';
import renewCookie from '../utilities/renewCookie';

const Article = ({
  postId,
  isFirstArticle,
  title,
  upvotes,
  username,
  date,
  comments,
  link,
  redirectUrl,
  userId,
  authorId,
  shouldDisplayEditOptions,
  accessToken,
}) => {
  const ENDPOINT = getEndpoint();
  const [shouldDisplayEditInputs, setShouldDisplayEditInputs] = useState(false);
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [hasDeleteOption, setHasDeleteOption] = useState(false);
  const [shouldRedirectLogin, setShouldRedirectLogin] = useState(false);
  const [shouldRedirectProfile, setShouldRedirectProfile] = useState(false);
  const [shouldRedirectIndex, setShouldRedirectIndex] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [upvotesCount, setUpvotesCount] = useState(upvotes);
  const [text, setText] = useState(title);
  const [url, setUrl] = useState(link);
  const router = useRouter();

  useEffect(() => {
    if (shouldRedirectLogin) {
      router.push('/login');
      setShouldRedirectLogin((prev) => !prev);
    }

    if (shouldRedirectIndex) {
      router.push('/');
      setShouldRedirectIndex((prev) => !prev);
    }

    if (shouldRedirectProfile) {
      router.push('/myProfile');
      setShouldRedirectProfile((prev) => !prev);
    }
  }, [shouldRedirectLogin, router, shouldRedirectIndex, shouldRedirectProfile]);

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

    let userId = jwt.decode(accessToken).sub;
    let isExpired = isTokenExpired(accessToken);

    let updatedToken = isExpired
      ? (await renewToken(ENDPOINT, userId)).accessToken
      : accessToken;

    const response = await fetch(ENDPOINT + '/posts/delete/' + postId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${updatedToken}`,
      },
    });

    // todo: check for errors аnd set them
    // console.log(response.status);
    // setErrors(() => result);
    checkResponseDelete(response);
  };

  const checkResponseDelete = (response) => {
    if (response.status === DELETED_RESPONSE_CODE) {
      setHasDeleteOption((hasDeleteOption) => !hasDeleteOption);
      setModalMessage(() => 'Новината беше успешно изтрита.');
      setShouldRedirectIndex(() => true);
      // setTimeout(() => Router.push('/'), 2000);
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

    let userId = jwt.decode(accessToken).sub;
    let isExpired = isTokenExpired(accessToken);

    // if token is not valid, generate a new one, else take the previous value
    let updatedToken = isExpired
      ? (await renewToken(ENDPOINT, userId)).accessToken
      : accessToken;

    isExpired ? await renewCookie(updatedToken) : null;

    const response = await fetch(ENDPOINT + '/posts/update/' + postId, {
      method: 'PATCH',
      body: JSON.stringify({ text, url }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${updatedToken}`,
      },
    });

    // todo: check for errors аnd set them
    // setErrors(() => result);
    checkResponseEdit(response);
  };

  const checkResponseEdit = (response) => {
    if (response.status === EDITED_RESPONSE_CODE) {
      setShouldRedirectIndex(() => true);
      // setShouldRedirectProfile(() => true);
    }
  };

  // voting
  const upvote = async () => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return;
    }

    let userId = jwt.decode(accessToken).sub;
    let isExpired = isTokenExpired(accessToken);

    // if token is not valid, generate a new one, else take the previous value
    let updatedToken = isExpired
      ? (await renewToken(ENDPOINT, userId)).accessToken
      : accessToken;

    isExpired ? await renewCookie(updatedToken) : null;

    const response = await fetch(ENDPOINT + '/posts/upvote/' + postId, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${updatedToken}`,
      },
    });

    setShouldRotate(() => !shouldRotate);
    await checkResponseVote(response);
  };

  const checkResponseVote = async (response) => {
    console.log(response);
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

  // presentation logic
  const articleClasses = isFirstArticle
    ? `${styles.article__regular} ${styles.article__rounded}`
    : `${styles.article__regular}`;

  return (
    <article className={articleClasses}>
      <div className={styles.article__main}>
        {shouldDisplayEditInputs ? (
          <>
            <div className={styles.article__inputs__wrapper}>
              <Input
                defaultValue={title}
                onChange={(e) => setText(e.target.value)}
              />
              <Input
                defaultValue={link}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div
              className={styles.article__modify}
              onClick={() => toggleEditInputs()}
            >
              <FontAwesomeIcon
                icon={faSave}
                onClick={() => confirmEdit(ENDPOINT)}
              />
            </div>
          </>
        ) : (
          <h2 className={styles.article__title}>
            <a href={link}>{title}</a>
          </h2>
        )}

        <Modal
          text={modalMessage}
          shouldDisplay={shouldDisplayModal}
          toggleModal={(shouldDisplay) => setShouldDisplayModal(!shouldDisplay)}
          hasDeleteOption={hasDeleteOption}
          confirmOptionText={'Да'}
          cancelOptionText={'Не'}
          confirmDelete={() => confirmDelete(ENDPOINT)}
        />

        {shouldDisplayEditOptions ? (
          <>
            <div
              className={styles.article__modify}
              onClick={() => toggleEditInputs()}
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
          <Link href={{ pathname: '/view', query: { name: text, postId } }}>
            <a>{new Date(date).toLocaleDateString('bg-BGgit switc')}</a>
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
