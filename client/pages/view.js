import React, { useState, useEffect } from 'react';
import styles from '../styles/SingleArticle.module.css';
import Article from '../components/Article';
import Comment from '../components/Comment';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import {
  CANNOT_FIND_POST_ERROR,
  INVALID_ID,
  getEnvironmentInfo,
} from '../utilities/common';
import INDEX_PATH from '../next.config';
import { useRouter } from 'next/router';
import countChildren from '../utilities/countChildren';

export async function getServerSideProps({ query: { postId, name } }) {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const response = await fetch(ENDPOINT + `/posts/comments/` + postId);
  const data = await response.json();

  const treeResponse = await fetch(ENDPOINT + '/tree/' + postId);
  const treeData = await treeResponse.json();

  return {
    props: {
      postId,
      data,
      tree: treeData.tree,
      ENDPOINT,
    },
  };
}

// todo: finish up here, get current post + comments by the post's id
const View = ({ postId, data, tree, ENDPOINT }) => {
  const router = useRouter();
  const isNotFound = data?.message?.includes(CANNOT_FIND_POST_ERROR);
  const isNotValidId = data?.message?.includes(INVALID_ID);

  const [iconsDisplay, setIconsDisplay] = useState(false);

  useEffect(() => {
    if (isNotFound || isNotValidId) {
      router.push('/');
    }
  }, [isNotFound, isNotValidId, router]);

  useEffect(() => {
    //TODO: Should display icons
    // //   const shouldDisplayIcons = data.post.authorId ===
    // console.log(data);
  }, []);

  const article = data.post;

  if (isNotFound || isNotValidId) {
    return <div>Invalid ID was provided.</div>;
  }

  const singleArticle = (
    <Article
      // key={_id}
      // id={_id}
      key={article._id}
      postId={article._id}
      isFirstArticle={true}
      title={article.text}
      // upvotes={article.upvoters.length}
      // todo: use username instead of author id
      username={article.authorId.substring(0, 6)}
      // todo: improve date displaying
      date={article.creationDate.split('T')[0]}
      // todo: show real comments count
      upvotes={article.upvoters.length}
      comments={6}
      link={article.url}
      redirectUrl={INDEX_PATH}
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
          <main className={'articles'}>
            <section className="article__wrapper">
              {singleArticle}
              {tree.map((comment) => {
                const childrenCount = countChildren(comment);

                return (
                  <Comment
                    title={comment.text}
                    date={comment.creationDate}
                    upvotes={comment.upvoters.length}
                    username={'TODO'}
                    comments={childrenCount}
                    childrenComments={comment.children}
                    key={comment._id}
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
