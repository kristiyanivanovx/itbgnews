import React, { useEffect, useState } from 'react';
import styles from '../styles/Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faClock,
  faComment,
  faEdit,
  faReply,
  faSave,
  faTrashAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import countChildren from '../utilities/countChildren';
import {
  CREATED_RESPONSE_CODE,
  DELETED_RESPONSE_CODE,
  EDITED_RESPONSE_CODE,
  REMOVED_RESPONSE_CODE,
  UNAUTHORIZED_RESPONSE_CODE,
} from '../utilities/common';
import ensureValidCookie from '../utilities/ensureValidCookie';
import Input from './Input';
import Modal from './Modal';
import { useRouter } from 'next/router';

const Comment = ({
  commentId,
  title,
  username,
  date,
  comments,
  upvotes,
  shouldDisplayModifyButtons,
  changeReplyingTo,
  shouldDisplayReplyIcon,
  childrenComments,
  postId,
  replyingTo,
  accessToken,
  ENDPOINT,
  userId,
  shouldDisplayEditOption,
}) => {
  const [formText, setFormText] = useState(title);
  const [shouldDisplayEditInputs, setShouldDisplayEditInputs] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(upvotes);
  const [shouldShowInput, setShouldShowInput] = useState(false);
  const [shouldRedirectLogin, setShouldRedirectLogin] = useState(false);
  const [iconsDisplay, setIconsDisplay] = useState(false);
  const [originalText, setOriginalText] = useState(title);
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [hasDeleteOption, setHasDeleteOption] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (shouldRedirectLogin) {
      router.push('/login');
    }
  }, [shouldRedirectLogin, router]);

  // edit
  const confirmEdit = async () => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return;
    }

    const response = await fetch(
      ENDPOINT + '/comments/update/' + commentId, // replyingTo.id
      {
        method: 'PATCH',
        body: JSON.stringify({ text: formText }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
        },
      },
    );

    // todo: check for errors аnd set them
    // setErrors(() => result);
    await checkResponseEdit(response);
  };

  const checkResponseEdit = async (response) => {
    if (response.status === EDITED_RESPONSE_CODE) {
      const data = await response.json();

      setOriginalText(() => data.text);
      setFormText(() => data.text);
    }
  };

  // voting
  const upvote = async () => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return;
    }

    const response = await fetch(ENDPOINT + '/comments/upvote/' + commentId, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
    });

    setShouldRotate((shouldRotate) => !shouldRotate);
    await checkResponseVote(response);
  };

  const checkResponseVote = async (response) => {
    console.log(response);
    const data = await response.json();
    console.log(data);
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

  const toggleEditInputs = () => {
    setShouldDisplayEditInputs(
      (shouldDisplayEditInputs) => !shouldDisplayEditInputs,
    );
  };

  // delete
  const confirmDelete = async () => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return;
    }

    const response = await fetch(
      ENDPOINT + '/comments/delete/' + postId + '/' + commentId,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
        },
      },
    );

    // todo: check for errors аnd set them
    // setErrors(() => result);
    checkResponseDelete(response);
  };

  const checkResponseDelete = (response) => {
    if (response.status === DELETED_RESPONSE_CODE) {
      setHasDeleteOption((hasDeleteOption) => !hasDeleteOption);
      setModalMessage(() => 'Коментарът беше успешно изтрит.');
      setTimeout(() => {
        setIsDeleted(() => true);
      }, 1000);
    }
  };

  const toggleModalDelete = (message) => {
    setHasDeleteOption(() => true);
    setModalMessage(() => message);
    setShouldDisplayModal((shouldDisplay) => !shouldDisplay);
  };

  return (
    // <<<<<<< HEAD
    //    >> in notepad
    // =======

    <div className={styles.comment}>
      <div className={styles.comment__left}>
        <div className={styles.comment__votes__count}>10</div>
        <div className={styles.comment__line}></div>
      </div>
      <div className={styles.comment__right}>
        <div className={styles.comment__data}>
          <div className={styles.comment__author}>Петър</div>
          <div className={styles.comment__created}>
            <FontAwesomeIcon
              icon={faClock}
              className={styles.comment__information__icon}
            />
            {new Date(date).toLocaleDateString('bg-BG')}
          </div>
        </div>
        <div className={styles.comment__body}>
          Някъв коментар
          <div className={styles.comment__votes__icon}>
            <div
              className={`${styles.comment__votes} ${styles.comment__small__text}`}
            >
              {/* icons */}
              <div className={''}>
                <FontAwesomeIcon icon={faSave} />
              </div>
              <div className={''}>
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <div onClick={() => changeReplyingTo(commentId, false)}>
                <FontAwesomeIcon icon={faReply} />
              </div>
              <div onLoad={upvote}>
                <FontAwesomeIcon
                  className={styles.comment__votes__icon}
                  icon={faChevronUp}
                />
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faComment}
                  className={styles.comment__information__icon}
                />
                {/*{comments} коментара*/}
                {comments} отговора
              </div>
            </div>
          </div>
          {/*>>>>>>> add-icons-comment*/}
        </div>
      </div>
    </div>
  );
};

export default Comment;
