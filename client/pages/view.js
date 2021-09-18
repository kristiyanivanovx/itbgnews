import React, { useEffect } from 'react';
import styles from '../styles/SingleArticle.module.css';
import Article from '../components/Article';
import Comment from '../components/Comment';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { getEnvironmentInfo } from '../utilities/common';
import INDEX_PATH from '../next.config';

export async function getServerSideProps({ query: { post_id } }) {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const response = await fetch(ENDPOINT + `/posts/${post_id}/comments`);
  const data = await response.json();

  return {
    props: {
      post_id,
      data,
      ENDPOINT,
    },
  };
}

// todo: finish up here, get current post + comments by the post's id
const View = ({ post_id, data, ENDPOINT }) => {
  const article = data.post;

  const singleArticle = (
    <Article
      // key={_id}
      // id={_id}
      key={article._id}
      id={article._id}
      isFirstArticle={true}
      title={article.text}
      // upvotes={article.upvoters.length}
      // todo: use username instead of author id
      username={article.author_id.substring(0, 6)}
      // todo: improve date displaying
      date={article.creation_date.split('T')[0]}
      // todo: show real comments count
      comments={6}
      link={article.url}
      redirectUrl={INDEX_PATH}
    />
  );

  // todo: get dynamically
  const comments = [];
  for (let i = 0; i < 3; i++) {
    comments.push(
      <div key={i} className={styles.comment__wrapper}>
        <Comment
          title={'Добре.'}
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
      <HeadComponent currentPageName={'Article #ID'} />
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
