import React from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import Header from '../components/Header';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { getEnvironmentInfo } from '../utilities/common';

// todo: when a posts is deleted, update articles to exclude it
export async function getServerSideProps(context) {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();

  // todo: get page and limit dynamically - /posts?page=1&limit=10
  const response = await fetch(ENDPOINT + '/posts?page=1&limit=10');
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // todo: check for error (data.message != null)
  return {
    props: { data },
  };
}

function Home({ data }) {
  const articles = [];

  for (let i = 0; i < data.length; i++) {
    let {
      _id,
      text,
      author_id,
      url,
      textContent,
      last_edit_date,
      creation_date,
      upvoters,
    } = data[i];

    articles.push(
      <Article
        key={_id}
        id={_id}
        isFirstArticle={i === 0}
        title={text}
        upvotes={upvoters.length}
        // todo: use username instead of author id
        username={author_id.substring(0, 6)}
        // todo: improve date displaying
        date={creation_date.split('T')[0]}
        // todo: show real comments count
        comments={i}
        link={url}
      />,
    );
  }
  return (
    <>
      <HeadComponent currentPageName={'Всички Статии'} />
      <div className={'container'}>
        <div className={'col'}>
          <Header />
        </div>
        <div className={'col'}>
          <SideNav />
          <main className={'articles'}>{articles}</main>
        </div>
      </div>
    </>
  );
}

Home.getLayout = getDefaultLayout;

export default Home;
