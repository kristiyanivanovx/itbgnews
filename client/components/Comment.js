import React from 'react';
import styles from '../styles/Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronUp,
    faClock,
    faComment,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

const Comment = ({ title, link, username, hours, comments, upvotes, tabs }) => {
    const width = 100 - tabs * 10;

    return (
        <div className={styles.comment__border} style={{ width: width + '%' }}>
            <div className={styles.comment__regular}>
                <div className={styles.comment__main}>
                    <p className={styles.comment__title}>
                        <a href={link}> {title}</a>
                    </p>
                    <div className={styles.comment__votes}>
                        <FontAwesomeIcon
                            className={styles.comment__votes__icon}
                            icon={faChevronUp}
                        />
                        {upvotes} гласа
                    </div>
                </div>
                <div className={styles.comment__information}>
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
                        преди {hours} часа
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
    );
};

export default Comment;
