import styles from '../styles/Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faClock,
  faComment,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import countChildren from '../utilities/countChildren';

const Comment = ({
  title,
  link,
  username,
  date,
  comments,
  upvotes,
  childrenComments,
  shouldDisplayEditAndDeleteButtons,
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
                <a href={link}> {title}</a>
              </p>
              <div
                className={`${styles.comment__votes} ${styles.comment__small__text}`}
              >
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
                {date}
                {/*преди {hours} часа*/}
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
              title={comment.text}
              link={
                'https://stackoverflow.com/questions/50563188/access-denied-issue-with-nvm-in-windows-10'
              }
              childrenComments={comment.children}
              comments={childrenCount}
              upvotes={comment.upvoters.length}
              username={'TODO'}
              date={comment.creationDate}
              key={comment._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
