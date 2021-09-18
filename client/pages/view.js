import React from 'react';
import styles from '../styles/SingleArticle.module.css';
import Article from '../components/Article';
import Comment from '../components/Comment';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getEnvironmentInfo } from '../utilities/common';

export async function getServerSideProps({ query }) {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  // const post_id = query.post_id;

  const { id } = query;
  console.log(id);
  console.log(id);
  const post_id = '613e45bcc7c51d3a984a682d';

  // todo: get page and limit dynamically - /posts?page=1&limit=10
  const response = await fetch(
    ENDPOINT + `/posts/comments?post_id=${post_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  // const data = response;
  const data = await response.json();
  console.log(response);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

// todo: finish up here, get current post + comments by the post's id
const View = ({ data }) => {
  console.log(data);

  // let {
  //   _id,
  //   text,
  //   author_id,
  //   url,
  //   textContent,
  //   last_edit_date,
  //   creation_date,
  //   upvoters,
  // } = data[i];

  const article = (
    <Article
      // key={_id}
      // id={_id}
      key={1}
      title={'Ех този Binary Search!'}
      upvotes={9}
      // upvotes={upvoters.length}
      username={'admin'}
      // todo: improve date displaying
      // date={creation_date.split('T')[0]}
      date={new Date().toLocaleDateString('bg-BG')}
      hours={5}
      comments={103}
      link={'https://it-bg.github.io/'}
      isFirstArticle={true}
    />
  );

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
              {article}
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
