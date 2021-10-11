import React, { useContext, useEffect, useReducer, useState } from 'react';
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

const initialState = 0;

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
  // const commentsContext = useContext(CommentsContext);
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

  // useEffect(() => {
  //   let { count } = state;
  //   // setUpvotesCount(() => count);
  // }, [state, state.count]);

  useEffect(() => {
    if (shouldRedirectLogin) {
      router.push('/login');
    }
  }, [shouldRedirectLogin, router]);

  // edit
  const confirmEdit = async () => {
    isTokenPresent(accessToken);

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

  const isTokenPresent = (accessToken) => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
      return false;
    }

    return true;
  };

  // voting
  const upvote = async () => {
    // const response = await fetch(ENDPOINT + '/comment/upvote/' + commentId, {
    //   method: 'PATCH',
    //   headers: {
    //     Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
    //   },
    // });
    //
    // await checkResponseVote(response);
  };

  const checkResponseVote = async (response) => {
    const data = await response.json();
    const { count } = data;

    if (
      response.status === CREATED_RESPONSE_CODE ||
      response.status === REMOVED_RESPONSE_CODE
    ) {
      setUpvotesCount(() => count);
      setShouldRotate((shouldRotate) => !shouldRotate);
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
    isTokenPresent();

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
    <div
      className={styles.comment}
      style={{ display: originalText ? 'flex' : 'none' }}
    >
      {/*<div>*/}
      {/*  {commentsContext.commentState}*/}
      {/*  <br />*/}

      {/*  <button onClick={() => commentsContext.commentDispatch('decrement')}>*/}
      {/*    decrement*/}
      {/*  </button>*/}
      {/*  <button onClick={() => commentsContext.commentDispatch('reset')}>*/}
      {/*    reset*/}
      {/*  </button>*/}
      {/*</div>*/}
      <Modal
        text={modalMessage}
        shouldDisplay={shouldDisplayModal}
        toggleModal={(shouldDisplay) => setShouldDisplayModal(!shouldDisplay)}
        hasDeleteOption={hasDeleteOption}
        confirmOptionText={'Да'}
        cancelOptionText={'Не'}
        confirmDelete={confirmDelete}
      />

      <div className={styles.comment__left}>
        <div className={styles.comment__votes__count}>
          {/*{count.firstCounter} | */}
          {upvotesCount}
        </div>
        <div className={styles.comment__line}></div>
      </div>
      <div className={styles.comment__right}>
        <div className={styles.comment__data}>
          <div className={styles.comment__author}>{username}</div>
          <div
            className={`${styles.comment__created} ${styles.comment__small__text}`}
          >
            {new Date(date).toLocaleDateString('bg-BG')}
          </div>
        </div>

        <div className={styles.comment__body}>
          {shouldDisplayEditInputs ? (
            <>
              <div className={styles.comment__inputs__wrapper}>
                <Input
                  defaultValue={originalText}
                  onChange={(e) => setFormText(e.target.value)}
                />
              </div>
            </>
          ) : (
            <p className={styles.comment__title}>{originalText}</p>
          )}
          <div className={styles.comment__votes__icon}>
            <div
              className={`${styles.comment__votes} ${styles.comment__small__text}`}
            >
              {shouldDisplayEditOption ? (
                <>
                  <div
                    className={styles.comment__modify}
                    onClick={toggleEditInputs}
                  >
                    <FontAwesomeIcon icon={faSave} onClick={confirmEdit} />
                    {/*<FontAwesomeIcon icon={faSave} onClick={countContext.dispatch} />*/}
                  </div>
                  <div
                    className={styles.comment__modify}
                    onClick={toggleEditInputs}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </div>
                  <div
                    className={styles.comment__modify}
                    onClick={() =>
                      toggleModalDelete(
                        'Сигурни ли сте, че искате да изтриете този коментар?',
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </>
              ) : null}
              {shouldDisplayReplyIcon ? (
                <div
                  className={styles.comment__modify}
                  onClick={() => changeReplyingTo(commentId, false)}
                >
                  <FontAwesomeIcon icon={faReply} />
                </div>
              ) : null}
              <div
                className={styles.comment__modify}
                // onClick={upvote}
                onClick={async () => {
                  // isTokenPresent(accessToken)
                  //   ? dispatch({
                  //       type: COMMENT_ACTIONS.UPVOTE,
                  //       payload: {
                  //         commentId: commentId,
                  //         token: await ensureValidCookie(accessToken),
                  //         ENDPOINT: ENDPOINT,
                  //       },
                  //     })
                  //   : null;
                }}
              >
                <FontAwesomeIcon
                  className={`${styles.comment__votes__icon} ${
                    shouldRotate ? styles.rotated : ''
                  }`}
                  icon={faChevronUp}
                />
              </div>
              <div className={styles.comment__modify}>
                <FontAwesomeIcon
                  icon={faComment}
                  className={styles.comment__information__icon}
                />
              </div>
              <span>2(hardcoded!)&nbsp;отговора</span>

              {/*<span>{comment} отговора</span>*/}
            </div>
          </div>
        </div>
        {/* nested comment */}
        {childrenComments?.map((comment) => {
          const childrenCount = countChildren(comment);
          const shouldDisplayEditOption =
            comment.authorId === userId && comment.text;

          // validate that passing postId, replyingTo, accessToken works
          return (
            <Comment
              key={comment._id}
              commentId={comment._id}
              title={comment.text}
              date={comment.creationDate}
              upvotes={comment.upvoters.length}
              username={comment.authorName}
              comments={childrenCount}
              childrenComments={comment.children}
              changeReplyingTo={changeReplyingTo}
              shouldDisplayReplyIcon={true}
              postId={postId}
              replyingTo={replyingTo}
              accessToken={accessToken}
              ENDPOINT={ENDPOINT}
              // todo: check if current user === comment creator
              userId={userId}
              shouldDisplayEditOption={shouldDisplayEditOption}
            />
          );
        })}
      </div>
    </div>
  );
};

// const { checkResponseVote } = Comment;
//
// module.exports = {
//   checkResponseVote,
// };

export default Comment;
