import React, { useEffect, useState } from 'react';
import styles from '../styles/SingleArticle.module.css';
import Article from '../components/Article';
import Comment from '../components/Comment';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import {
  CANNOT_FIND_POST_ERROR,
  INVALID_ID,
  getEndpoint,
} from '../utilities/common';
import INDEX_PATH from '../next.config';
import { useRouter } from 'next/router';
import getUserToken from '../utilities/getUserToken';
import jwt from 'jsonwebtoken';

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

  return {
    props: {
      postId,
      accessToken,
      data,
      ENDPOINT,
    },
  };
}

// todo: finish up here, get current post + comments by the post's id
const View = ({ postId, accessToken, data, ENDPOINT }) => {
  const router = useRouter();

  const [userId, setUserId] = useState(
    jwt.decode(accessToken ?? null)?.sub ?? null,
  );

  const isNotFound = data?.message?.includes(CANNOT_FIND_POST_ERROR);
  const isNotValidId = data?.message?.includes(INVALID_ID);

  useEffect(() => {
    if (isNotFound || isNotValidId) {
      router.push('/');
    }
  }, [isNotFound, isNotValidId, router]);

  const article = data.post;

  if (isNotFound || isNotValidId) {
    return <div>Invalid ID was provided.</div>;
  }

  const singleArticle = (
    <Article
      key={article._id}
      postId={article._id}
      isFirstArticle={true}
      title={article.text}
      username={article.authorName}
      // todo: improve date displaying
      date={article.creationDate.toString()}
      // todo: show real comments count
      upvotes={article.upvoters.length}
      comments={6}
      link={article.url}
      redirectUrl={INDEX_PATH}
      authorId={article.authorId}
      userId={userId}
      accessToken={accessToken}
      shouldDisplayEditOptions={userId === article.authorId}
    />
  );

  // todo: get dynamically
  const comments = [];
  for (let i = 0; i < 3; i++) {
    comments.push(
      <div key={i} className={styles.comment__wrapper}>
        <Comment
          title={'binarysearch.com'}
          date={new Date().toLocaleDateString('bg-BG')}
          upvotes={19}
          username={'admin'}
          hours={6}
          comments={163}
          tabs={i * 2}
        />
      </div>,
    );
  }

  return (
    <>
      <HeadComponent currentPageName={article.text} />
      <div className={'container'}>
        <div className={'col'}>
          <Header />
        </div>
        <div className={'col'}>
          <SideNav />
          <main className={'articles'}>
            <section className="article__wrapper">
              {singleArticle}
              {comments}
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

View.getLayout = getDefaultLayout;

export default View;
