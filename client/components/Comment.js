import { useState } from 'react';
import styles from '../styles/Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faClock,
  faComment,
  faReply,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import countChildren from '../utilities/countChildren';

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
}) => {
  // if (!childrenComments) {
  //   return <></>;
  // }

  return (
    <div className={styles.comment__flex}>
      <div className={styles.comment__wrapper}>
        <div className={styles.comment__border}>
          <div className={styles.comment__regular}>
            <div className={styles.comment__main}>
              <p className={styles.comment__title}>
                {/*<a href={link}> {title}</a>*/}
                {title}
              </p>
              <div
                className={`${styles.comment__votes} ${styles.comment__small__text}`}
              >
                {shouldDisplayReplyIcon ? (
                  <div onClick={() => changeReplyingTo(commentId, false)}>
                    <FontAwesomeIcon icon={faReply} />{' '}
                  </div>
                ) : null}
                <FontAwesomeIcon
                  className={styles.comment__votes__icon}
                  icon={faChevronUp}
                />
                {upvotes} гласа
              </div>
            </div>
            <div
              className={`${styles.comment__information} ${styles.comment__small__text}`}
            >
              <div>
                <FontAwesomeIcon
                  icon={faUser}
                  className={styles.comment__information__icon}
                />
                от {username}
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faClock}
                  className={styles.comment__information__icon}
                />
                {new Date(date).toLocaleDateString('bg-BG')}
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faComment}
                  className={styles.comment__information__icon}
                />
                {comments} коментара
              </div>
            </div>
          </div>
        </div>

        {childrenComments?.map((comment) => {
          const childrenCount = countChildren(comment);

          return (
            <Comment
              key={comment._id}
              commentId={comment._id}
              title={comment.text}
              childrenComments={comment.children}
              comments={childrenCount}
              upvotes={comment.upvoters.length}
              username={comment.authorName}
              date={comment.creationDate}
              shouldDisplayReplyIcon={true}
              changeReplyingTo={changeReplyingTo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
