import React from 'react';
import styles from '../styles/Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronUp,
    faClock,
    faComment,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Input from './Input';

const Article = ({
    title,
    link,
    username,
    hours,
    comments,
    upvotes,
    isFirstArticle,
}) => {
    const articleClasses = isFirstArticle
        ? `${styles.article__regular} ${styles.article__rounded}`
        : `${styles.article__regular}`;

    return (
        <article
            className={articleClasses}
            style={{ display: isDeleted ? 'none' : 'flex' }}
        >
            <div
                className={
                    shouldDisplayEditInputs
                        ? `${styles.article__main} ${styles.article__main__column}`
                        : styles.article__main
                }
            >
                {shouldDisplayEditInputs ? (
                    <>
                        <div className={styles.article__inputs__wrapper}>
                            <Input
                                defaultValue={originalText}
                                onChange={(e) => setFormText(e.target.value)}
                            />
                            <Input
                                defaultValue={originalUrl}
                                onChange={(e) => setFormUrl(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <h2 className={styles.article__title}>
                        <a href={originalUrl}>{originalText}</a>
                    </h2>
                )}
                <Modal
                    text={modalMessage}
                    shouldDisplay={shouldDisplayModal}
                    toggleModal={(shouldDisplay) =>
                        setShouldDisplayModal(!shouldDisplay)
                    }
                    hasDeleteOption={hasDeleteOption}
                    confirmOptionText={'Да'}
                    cancelOptionText={'Не'}
                    confirmDelete={confirmDelete}
                />
                <div
                    className={
                        shouldDisplayEditInputs
                            ? `${styles.article__icons} ${styles.article__icons__edit}`
                            : styles.article__icons
                    }
                >
                    <div
                        className={styles.article__modify}
                        onClick={toggleEditInputs}
                    >
                        <FontAwesomeIcon icon={faSave} onClick={confirmEdit} />
                    </div>
                    {shouldDisplayEditOptions ? (
                        <>
                            <div
                                className={styles.article__modify}
                                onClick={toggleEditInputs}
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
                    {shouldDisplayReplyIcon ? (
                        <div
                            className={styles.article__modify}
                            onClick={() => changeReplyingTo(postId, true)}
                        >
                            <FontAwesomeIcon icon={faReply} />{' '}
                        </div>
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
                    <Link
                        href={{
                            pathname: '/view',
                            query: { name: formText, postId },
                        }}
                    >
                        <a>{new Date(date).toLocaleDateString('bg-BG')}</a>
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
