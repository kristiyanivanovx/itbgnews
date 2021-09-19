import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import Header from '../components/Header';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import {
  hasAccess,
  refresh,
  getEnvironmentInfo,
  JWT_ACCESS_TIME,
  JWT_REFRESH_TIME,
} from '../utilities/common';
import InfiniteScroll from 'react-infinite-scroll-component';
import INDEX_PATH from '../next.config';
import { useCookies } from 'react-cookie';

// export async function getServerSideProps(context) {
//   const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
//
//   const response = await fetch(ENDPOINT + '/posts?skip=0&limit=10');
//   const data = await response.json();
//
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }
//
//   return {
//     props: { data, ENDPOINT },
//   };
// }

const Home = () => {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const [articles, setArticles] = useState({});
  const [articlesCount, setArticlesCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [shouldAuth, setShouldAuth] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  const getInitialArticles = async () => {
    const response = await fetch(ENDPOINT + '/posts?skip=0&limit=10');
    return await response.json();
  };

  // only fetch the articles one time, then set the boolean to false
  if (shouldFetch) {
    getInitialArticles().then((data) => {
      setArticles((prev) => data.posts);
      setArticlesCount((articlesCount) => data.postsCount);
      setShouldFetch((prev) => false);
    });
  }

  let user = null;

  if (shouldAuth) {
    user = hasAccess(cookies.accessToken, cookies.refreshToken, ENDPOINT);

    user.then((accessToken) => {
      if (accessToken) {
        setCookie('accessToken', accessToken, {
          path: '/',
          maxAge: JWT_ACCESS_TIME,
        });
      }
    });

    setShouldAuth(() => false);
  }

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
