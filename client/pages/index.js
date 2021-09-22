import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import Header from '../components/Header';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { getEnvironmentInfo, JWT_ACCESS_TIME } from '../utilities/common';
import InfiniteScroll from 'react-infinite-scroll-component';
import INDEX_PATH from '../next.config';
import { useCookies } from 'react-cookie';
const jwt = require('jsonwebtoken');

export async function getServerSideProps(context) {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();

  const response = await fetch(ENDPOINT + '/posts?skip=0&limit=10');
  const data = await response.json();

  if (!data) {
    return { notFound: true };
  }

  return { props: { data, ENDPOINT } };
}

const Home = ({ data, ENDPOINT }) => {
  const [articles, setArticles] = useState(data.posts);
  console.log(data)
  const [articlesCount, setArticlesCount] = useState(data.postsCount);
  console.log(data.postsCount)
  const [hasMore, setHasMore] = useState(true);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setHasMore(articlesCount > articles.length);
  }, [articles, articlesCount]);

  const getMoreArticles = async () => {
    const response = await fetch(
      ENDPOINT + `/posts?skip=${articles.length}&limit=10`,
    );

    const { posts } = await response.json();
    setArticles((articles) => [...articles, ...posts]);
  };

  return (
    <>
      <HeadComponent currentPageName={'Всички Статии'} />
      <div className={'container'}>
        <div className={'col'}>
          <Header />
        </div>
        <div className={'col'}>
          <SideNav />
          <main className={'articles'}>
            <InfiniteScroll
              dataLength={articles.length || 0}
              next={getMoreArticles}
              hasMore={hasMore}
              loader={<h4>Зареждане...</h4>}
              endMessage={
                <p className={'center'}>Това са всичките налични статии!</p>
              }
            >
              {articles.length > 0
                ? articles.map((article, index) => (
                  <Article
                    key={article._id}
                    postId={article._id}
                    isFirstArticle={index === 0}
                    title={article.text}
                    upvotes={article.upvoters.length}
                    // todo: use username instead of author id
                    username={article.authorName}
                    // todo: improve date displaying
                    date={article.creationDate}
                    // todo: show real comments count
                    comments={index}
                    link={article.url}
                    redirectUrl={INDEX_PATH}
                    shouldDisplayModifyButtons={userId === article.authorId}
                    userId={userId}
                  />
                ))
                : null}
            </InfiniteScroll>
          </main>
        </div>
      </div>
    </>
  );
};

// let Home = withTokens(HomeBase);
Home.getLayout = getDefaultLayout;

export default Home;