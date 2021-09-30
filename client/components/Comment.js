import React, { useState } from 'react';
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
import jwt from 'jsonwebtoken';
import isTokenExpired from '../utilities/isTokenExpired';
import renewToken from '../utilities/refreshToken';
import renewCookie from '../utilities/renewCookie';
import {
  CREATED_RESPONSE_CODE,
  REMOVED_RESPONSE_CODE,
  UNAUTHORIZED_RESPONSE_CODE,
} from '../utilities/common';
import ensureValidCookie from '../utilities/ensureValidCookie';
import Input from './Input';

const Comment = ({
  commentId,
  title,
  username,
  date,
  comments,
  upvotes,
  // tabs,
  shouldDisplayModifyButtons,
  changeReplyingTo,
  shouldDisplayReplyIcon,
  childrenComments,
  postId,
  replyingTo,
  accessToken,
  ENDPOINT,
}) => {
  const [upvotesCount, setUpvotesCount] = useState(upvotes);
  const [shouldShowInput, setShouldShowInput] = useState(false);
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  const [shouldRedirectLogin, setShouldRedirectLogin] = useState(false);
  const [iconsDisplay, setIconsDisplay] = useState(false);
  const [text, setText] = useState('');
  // const router = useRouter();

  const [userId, setUserId] = useState(
    jwt.decode(accessToken ?? null)?.sub ?? null,
  );

  // if (!childrenComments) {
  //   return <></>;
  // }

  // todo: validate
  const confirmEdit = async () => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return;
    }

    const response = await fetch(
      ENDPOINT + '/comments/update/' + replyingTo.id,
      {
        method: 'PATCH',
        body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
        },
      },
    );
    console.log(response);
    console.log(response.json());

    // todo: check for errors аnd set them
    // setErrors(() => result);
    // checkResponseEdit(response);
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

    // setShouldRotate(() => !shouldRotate);
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

  return (
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
          <Input />
          <div className={styles.comment__votes__icon}>
            <div
              className={`${styles.comment__votes} ${styles.comment__small__text}`}
            >
              {/* icons */}
              <div className={styles.comment__icon}>
                <FontAwesomeIcon icon={faSave} />
              </div>
              <div className={styles.comment__icon}>
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div>
                <FontAwesomeIcon
                  className={styles.comment__icon}
                  icon={faTrashAlt}
                />
              </div>
              <div onClick={() => changeReplyingTo(commentId, false)}>
                <FontAwesomeIcon
                  className={styles.comment__icon}
                  icon={faReply}
                />
              </div>
              <div className={styles.comment__icon} onLoad={upvote}>
                <FontAwesomeIcon
                  className={styles.comment__votes__icon}
                  icon={faChevronUp}
                />
              </div>
              <div
                className={`${styles.comment__icon} ${styles.comment__icon__comments}`}
              >
                <FontAwesomeIcon
                  icon={faComment}
                  className={styles.comment__information__icon}
                />
                {/*{comments} коментара*/}
              </div>
              <span>{comments} отговора</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
