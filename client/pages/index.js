import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import Header from '../components/Header';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import { getEndpoint } from '../utilities/common';
import InfiniteScroll from 'react-infinite-scroll-component';
import INDEX_PATH from '../next.config';
import getUserToken from '../utilities/getUserToken';
import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {
  const ENDPOINT = getEndpoint();
  const response = await fetch(ENDPOINT + '/posts?skip=0&limit=10');
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
      data,
      accessToken,
      ENDPOINT,
    },
  };
}

const Home = ({ data, accessToken, ENDPOINT }) => {
  const [articles, setArticles] = useState(data.posts);
  const [hasMore, setHasMore] = useState(true);
  const [userId, setUserId] = useState(
    jwt.decode(accessToken ?? null)?.sub ?? null,
  );

  useEffect(() => {
    setHasMore(data.postsCount > articles.length);
  }, [articles, data.postsCount]);

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
                      username={article.authorName}
                      date={article.creationDate}
                      // todo: show real comments count
                      comments={index}
                      link={article.url}
                      redirectUrl={INDEX_PATH}
                      authorId={article.authorId}
                      userId={userId}
                      shouldDisplayEditOptions={userId === article.authorId}
                      accessToken={accessToken}
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
