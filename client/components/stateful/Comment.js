import React, { useEffect, useState } from 'react';
import styles from '../../styles/Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faComment,
  faEdit,
  faReply,
  faSave,
  faTrashAlt,
  // faClock,
  // faUser,
} from '@fortawesome/free-solid-svg-icons';
import countChildren from '../../utilities/comment/countChildren';
import { pluralizeReplies } from '../../utilities/display/pluralize';
import ensureValidCookie from '../../utilities/auth/ensureValidCookie';
import Input from '../common/Input';
import Modal from '../common/Modal';
import { useRouter } from 'next/router';
import isTokenPresent from '../../utilities/auth/isTokenPresent';
import { upvoteComment, deleteComment, editComment } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';

const Comment = ({
  commentId,
  title,
  date,
  upvotes,
  username,
  comments,
  childrenComments,
  changeReplyingTo,
  shouldDisplayReplyIcon,
  postId,
  replyingTo,
  accessToken,
  userId,
  shouldDisplayEditOption,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [formText, setFormText] = useState(title);
  const [shouldDisplayEditInputs, setShouldDisplayEditInputs] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(upvotes);
  const [shouldRedirectLogin, setShouldRedirectLogin] = useState(false);
  const [originalText, setOriginalText] = useState(title);
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [hasDeleteOption, setHasDeleteOption] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  // const [shouldShowInput, setShouldShowInput] = useState(false);
  // const [iconsDisplay, setIconsDisplay] = useState(false);

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
      const count = store.getState().comment.count;
      setUpvotesCount(() => count);

      // console.log(state);
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
              <span>
                {comments}&nbsp;{pluralizeReplies(comments)}
              </span>
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
