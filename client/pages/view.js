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
  INVALID_ID,
  getEndpoint,
} from '../utilities/common';
import INDEX_PATH from '../next.config';
import Router, { useRouter } from 'next/router';
import getUserToken from '../utilities/getUserToken';
import jwt from 'jsonwebtoken';
import countChildren from '../utilities/countChildren';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import ensureValidCookie from '../utilities/ensureValidCookie';

export async function getServerSideProps(context) {
  const postId = context.query.postId;
  const ENDPOINT = getEndpoint();
  const response = await fetch(ENDPOINT + `/posts/comments/` + postId);
  const data = await response.json();

  const userToken = getUserToken(context.req?.headers.cookie);
  const accessToken = userToken ? userToken.split('=')[1] : null;

  if (!data) {
    return {
      notFound: true,
    };
  }

  const treeResponse = await fetch(ENDPOINT + '/tree/' + postId);
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

// todo: finish up here, get current post + comments by the post's id
const View = ({ postId, accessToken, data, tree, ENDPOINT }) => {
  const [shouldShowInput, setShouldShowInput] = useState(false);
  // const [shouldRedirect, setShouldRedirect] = useState(false);
  const [shouldRedirectLogin, setShouldRedirectLogin] = useState(false);
  const [iconsDisplay, setIconsDisplay] = useState(false);
  const [replyingTo, setReplyingTo] = useState({ id: postId, isPost: true });
  const [text, setText] = useState('');
  const router = useRouter();

  const [userId, setUserId] = useState(
    jwt.decode(accessToken ?? null)?.sub ?? null,
  );

  const isNotFound = data?.message?.includes(CANNOT_FIND_POST_ERROR);
  const isNotValidId = data?.message?.includes(INVALID_ID);

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
    // //   const shouldDisplayIcons = data.post.authorId ===
    // console.log(data);
  }, [shouldShowInput, text]);

  const article = data.post;

  const changeReplyingTo = (replyToId, isPost) => {
    if (!accessToken) {
      setShouldRedirectLogin(() => true);
    }

    setReplyingTo(() => ({ id: replyToId, isPost: isPost }));
    setShouldShowInput(() => true);
  };

  const confirmCreate = async () => {
    if (!accessToken) {
      // setShouldRedirectLogin(() => true);
      return;
    }

    const response = await fetch(ENDPOINT + '/comments/create', {
      method: 'POST',
      body: JSON.stringify({
        parentPostId: postId,
        parentCommentId: replyingTo.isPost ? 'false' : replyingTo.id,
        text: text,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
    });

    setShouldShowInput((prev) => !prev);
    router.replace(router.asPath);
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
      // todo: show real comments count
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
                    shouldDisplayEditOptions={true}
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
