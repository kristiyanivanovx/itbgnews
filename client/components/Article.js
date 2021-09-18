import React, { useState } from 'react';
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
import Router, { useRouter } from 'next/router';
import {
  REMOVED_RESPONSE_CODE,
  CREATED_RESPONSE_CODE,
  DELETED_RESPONSE_CODE,
  EDITED_RESPONSE_CODE,
  getEnvironmentInfo,
} from '../utilities/common';
import { useCookies } from 'react-cookie';
import Input from './Input';

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
  redirectUrl,
}) => {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  // const [deleteConfirmation, setDeleteConfirmation] = useState(1);
  const [shouldDisplayEditInputs, setShouldDisplayEditInputs] = useState(false);
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);
  const [hasDeleteOption, setHasDeleteOption] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [upvotesCount, setUpvotesCount] = useState(upvotes);

  const [text, setText] = useState(title);
  const [url, setUrl] = useState(link);

  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  const { asPath } = useRouter();

  // todo: critical - do not use hardcoded value
  // todo: maybe check cookies?
  const user_id = '61456ecfddea6520db1c8a7c';

  const toggleModalDelete = (message) => {
    setHasDeleteOption(() => true);
    setModalMessage(() => message);
    setShouldDisplayModal((shouldDisplay) => !shouldDisplay);
  };

  // delete
  // todo: delete the specific post, then redirect
  const confirmDelete = async (ENDPOINT) => {
    const jsonData = JSON.stringify({ user_id });

    // /posts/comments
    const response = await fetch(ENDPOINT + '/posts/' + user_id + '/' + id, {
      method: 'DELETE',
      body: jsonData,
      headers: {
        'Content-Type': 'application/json',
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
      setTimeout(() => Router.push(redirectUrl), 2000);
    }
  };

  // edit
  const toggleEditInputs = () => {
    setShouldDisplayEditInputs(
      (shouldDisplayEditInputs) => !shouldDisplayEditInputs,
    );
  };

  const confirmEdit = async (ENDPOINT) => {
    const json = JSON.stringify({ user_id, text, url });

    const response = await fetch(ENDPOINT + '/posts/' + id, {
      method: 'PATCH',
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // todo: check for errors аnd set them
    // setErrors(() => result);
    checkResponseEdit(response);
  };

  const checkResponseEdit = (response) => {
    if (response.status === EDITED_RESPONSE_CODE) {
      setTimeout(() => Router.push(redirectUrl));
    }
  };

  // voting
  const upvote = async (ENDPOINT) => {
    const json = JSON.stringify({ user_id });

    const response = await fetch(ENDPOINT + '/posts/upvote/' + id, {
      method: 'PATCH',
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // todo: check for errors аnd set them
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

        {/* todo: implement functionality */}
        {/* todo: only show to user who created the current item */}
        {!shouldDisplayEditAndDeleteButtons ? (
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
          onClick={() => upvote(ENDPOINT)}
          className={`${styles.article__votes} ${styles.article__small__text}`}
        >
          <FontAwesomeIcon
            className={styles.article__votes__icon}
            icon={faChevronUp}
          />
          {upvotesCount} гласа
        </div>
      </div>

      {/* article additional information */}
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
