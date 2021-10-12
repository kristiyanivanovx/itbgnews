import React, { useState, useEffect } from 'react';
import styles from '../styles/Articles.module.css';
import Article from '../components/Article';
import Comment from '../components/Comment';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import commentStyles from '../styles/Comment.module.css';
import {
  CANNOT_FIND_POST_ERROR,
  INVALID_ID_ERROR,
  getEndpoint,
} from '../utilities/common';
import INDEX_PATH from '../next.config';
import { useRouter } from 'next/router';
import getUserToken from '../utilities/getUserToken';
import jwt from 'jsonwebtoken';
import countChildren from '../utilities/countChildren';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { addComment } from '../components/redux';
import isTokenPresent from '../helpers/isTokenPresent';
import ensureValidCookie from '../utilities/ensureValidCookie';

export async function getServerSideProps(context) {
  const ENDPOINT = getEndpoint();

  const postId = context.query.postId;

  const target = ENDPOINT + `/posts/comments/` + postId;
  const response = await fetch(target);
  const data = await response.json();

  const userToken = getUserToken(context.req?.headers.cookie);
  const accessToken = userToken ? userToken.split('=')[1] : null;

  if (!data) {
    return {
      notFound: true,
    };
  }

  const treeResponse = await fetch(getEndpoint() + '/tree/' + postId);
  const treeData = await treeResponse.json();

  return {
    props: {
      postId,
      accessToken,
      data,
      tree: treeData.tree,
      ENDPOINT,
    },
  };
}

const View = ({ postId, accessToken, data, tree, ENDPOINT }) => {
  const router = useRouter();
  const commentDispatch = useDispatch();
  const [shouldShowInput, setShouldShowInput] = useState(false);
  const [shouldRedirectLogin, setShouldRedirectLogin] = useState(false);
  const [replyingTo, setReplyingTo] = useState({ id: postId, isPost: true });
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(
    jwt.decode(accessToken ?? null)?.sub ?? null,
  );

  const isNotFound = data?.message?.includes(CANNOT_FIND_POST_ERROR);
  const isNotValidId = data?.message?.includes(INVALID_ID_ERROR);

  const toggleInput = () => {
    setShouldShowInput((prev) => !prev);
  };

  const handleChange = (text) => {
    setText(() => text);
  };

  useEffect(() => {
    if (isNotFound || isNotValidId) {
      router.push('/');
    }

    if (shouldRedirectLogin) {
      router.push('/login');
    }
  }, [isNotFound, isNotValidId, router, shouldRedirectLogin]);

  useEffect(() => {
    if (!shouldShowInput && text) {
      setText(() => '');
    }

    // TODO: Should display icons
    // const shouldDisplayIcons = data.post.authorId ===
    // console.log(data);
  }, [shouldShowInput, text]);

  const article = data.post;

  const changeReplyingTo = (replyToId, isPost) => {
    isTokenPresent(accessToken, setShouldRedirectLogin);

    setReplyingTo(() => ({ id: replyToId, isPost: isPost }));
    setShouldShowInput(() => true);
  };

  const confirmCreate = async () => {
    isTokenPresent(accessToken, setShouldRedirectLogin);

    const token = await ensureValidCookie(accessToken);

    console.log('1');
    let handle = addComment(postId, replyingTo, token, text);
    handle.then(() => {
      router.replace(router.asPath);
      setShouldShowInput((prev) => !prev);
    });

    commentDispatch(handle);

    console.log('handle');

    console.log('2');
    console.log('3');
  };

  const singleArticle = (
    <Article
      key={article._id}
      postId={article._id}
      isFirstArticle={true}
      title={article.text}
      username={article.authorName}
      date={article.creationDate}
      upvotes={article.upvoters.length}
      // todo: show real comment count
      comments={6}
      link={article.url}
      redirectUrl={INDEX_PATH}
      authorId={article.authorId}
      userId={userId}
      changeReplyingTo={changeReplyingTo}
      accessToken={accessToken}
      shouldDisplayReplyIcon={true}
      shouldDisplayEditOptions={userId === article.authorId}
    />
  );

  return (
    <>
      <HeadComponent currentPageName={article.text} />
      <div className={'container'}>
        <div className={'col'}>
          <Header />
        </div>
        <div className={'col'}>
          <SideNav />
          <main className={styles.articles}>
            <section className="article__wrapper">
              {singleArticle}
              <div className={commentStyles.add__comment}>
                {shouldShowInput ? (
                  <textarea
                    className={commentStyles.write__comment}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                ) : null}
                <div className={commentStyles.comment__icons}>
                  {shouldShowInput ? (
                    <div onClick={toggleInput}>
                      <FontAwesomeIcon icon={faTimes} />
                    </div>
                  ) : null}
                  {shouldShowInput ? (
                    <div onClick={async () => await confirmCreate()}>
                      <FontAwesomeIcon icon={faSave} />
                    </div>
                  ) : null}
                </div>
              </div>

              {tree.map((comment) => {
                const childrenCount = countChildren(comment);
                const shouldDisplayEditOption =
                  comment.authorId === userId && comment.text;

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
                    userId={userId}
                    shouldDisplayEditOption={shouldDisplayEditOption}
                  />
                );
              })}
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

View.getLayout = getDefaultLayout;

export default View;
