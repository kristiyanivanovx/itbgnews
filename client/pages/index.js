import React, { useEffect, useState } from 'react';
import Article from '../components/stateful/Article';
import SideNav from '../components/nav/SideNav';
import Header from '../components/stateful/Header';
import HeadComponent from '../components/common/HeadComponent';
import getDefaultLayout from '../utilities/layout/getDefaultLayout';
import getEndpoint from '../utilities/infrastructure/getEndpoint';
import InfiniteScroll from 'react-infinite-scroll-component';
import getUserToken from '../utilities/auth/getUserToken';
import jwt from 'jsonwebtoken';
import styles from '../styles/Articles.module.css';
import getMoreArticles from '../utilities/article/getMoreArticles';

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
  const userId = accessToken ? jwt.decode(accessToken).sub : null;

  useEffect(() => {
    setHasMore(data.postsCount > articles.length);
  }, [articles, data.postsCount]);

  const loadMoreArticles = async () => {
    return await getMoreArticles(
      setArticles,
      articles,
      ENDPOINT,
      `/posts?skip=${articles.length}&limit=10`,
    );
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
          <main className={styles.articles}>
            <InfiniteScroll
              dataLength={articles.length || 0}
              next={async () => await loadMoreArticles()}
              hasMore={hasMore}
              loader={<h4>Зареждане...</h4>}
              endMessage={
                <p className={'center'}>Това са всичките налични статии!</p>
              }
            >
              {articles.length > 0
                ? articles.map((article, index) => {
                    return (
                      <Article
                        key={article._id}
                        postId={article._id}
                        isFirstArticle={index === 0}
                        title={article.text}
                        currentUserHasLiked={article.upvoters.filter(upvoter => upvoter.userId === userId).length > 0}
                        upvotes={article.upvoters.length}
                        username={article.authorName}
                        date={article.creationDate}
                        link={article.url}
                        comments={article.commentsCount}
                        shouldDisplayEditOptions={userId === article.authorId}
                        accessToken={accessToken}
                        // authorId={article.authorId}
                        // userId={userId}
                        // redirectUrl={INDEX_PATH}
                      />
                    );
                  })
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
