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
  const [articlesCount, setArticlesCount] = useState(data.postsCount);
  const [hasMore, setHasMore] = useState(true);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [userId, setUserId] = useState(null);

  const getInitialArticles = async () => {
    const response = await fetch(ENDPOINT + '/posts?skip=0&limit=10');
    return await response.json();
  };

  useEffect(() => {
    setHasMore(articlesCount > articles.length);
  }, [articles, articlesCount]);

  useEffect(() => {
    if (cookies.accessToken) {
      const res = jwt.decode(cookies.accessToken);
      setUserId(() => res.sub);

      if (userId) {
        fetch(ENDPOINT + '/token', {
          method: 'POST',
          body: JSON.stringify({ userId }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((data) => data.json())
          .then((data) => {
            if (data.accessToken) {
              setCookie('accessToken', data.accessToken, {
                path: '/',
                maxAge: JWT_ACCESS_TIME,
              });
              setUserId(() => jwt.decode(cookies.accessToken).sub);
            }
          });
      }
    }
  }, [cookies.accessToken, ENDPOINT, userId, setCookie]);

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
              dataLength={articles.length ?? 0}
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
                      date={article.creationDate.split('T')[0]}
                      // todo: show real comments count
                      comments={index}
                      link={article.url}
                      redirectUrl={INDEX_PATH}
                      shouldDisplayModifyButtons={3 === article.authorName}
                      userId={3}
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

Home.getLayout = getDefaultLayout;

export default Home;
