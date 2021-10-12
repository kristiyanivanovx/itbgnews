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
import isTokenPresent from '../helpers/isTokenPresent';
import { addComment, upvoteComment, deleteComment, editComment } from './redux';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();
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

  const state = useSelector((state) => state);
  const comment = useSelector((state) => state.comment.comment);
  const message = useSelector((state) => state.comment.message);
  const count = useSelector((state) => state.comment.count);

  useEffect(() => {
    if (shouldRedirectLogin) {
      router.push('/login');
    }
  }, [shouldRedirectLogin, router]);

  const toggleModalDelete = (message) => {
    setHasDeleteOption(() => true);
    setModalMessage(() => message);
    setShouldDisplayModal((shouldDisplay) => !shouldDisplay);
  };

  const toggleEditInputs = () => {
    setShouldDisplayEditInputs(
      (shouldDisplayEditInputs) => !shouldDisplayEditInputs,
    );
  };

  // edit
  const confirmEdit = async () => {
    const token = await ensureValidCookie(accessToken);

    dispatch(editComment(commentId, formText, token)).then(() => {
      console.log('confirm edit comment');
      console.log(state);

      // todo: change component contents to new ones
      setOriginalText(() => state.comment.comment.text);
      setFormText(() => state.comment.comment.text);

      // setShouldShowInput((prev) => !prev);
      // setErrors(() => result);
    });
  };

  // voting
  const confirmUpvote = async () => {
    isTokenPresent(accessToken, setShouldRedirectLogin);
    const token = await ensureValidCookie(accessToken);

    dispatch(upvoteComment(commentId, token)).then(() => {
      console.log('.then state');
      console.log(state);

      console.log('.then count');
      console.log(count);
      // setUpvotesCount(() => state.comment.count);
      // setShouldRotate((shouldRotate) => !shouldRotate);
    });
  };

  // delete
  const confirmDelete = async () => {
    const token = await ensureValidCookie(accessToken);

    dispatch(deleteComment(commentId, postId, token)).then(() => {
      setHasDeleteOption((hasDeleteOption) => !hasDeleteOption);
      setModalMessage(() => 'Коментарът беше успешно изтрит.');

      setTimeout(() => {
        setIsDeleted(() => true);
      }, 1000);
    });
  };

  return (
    <div
      className={styles.comment}
      style={{ display: originalText && !isDeleted ? 'flex' : 'none' }}
      // style={{ display: isDeleted ? 'none' : 'flex' }}
    >
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
        <div className={styles.comment__votes__count}>{upvotesCount}</div>
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
                  {shouldDisplayEditInputs ? (
                    <div
                      className={styles.comment__modify}
                      onClick={toggleEditInputs}
                    >
                      <FontAwesomeIcon
                        icon={faSave}
                        onClick={async () => await confirmEdit()}
                      />
                    </div>
                  ) : null}
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
                onClick={async () => await confirmUpvote()}
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
              <span>{comments}&nbsp;отговора</span>
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

export default Comment;
