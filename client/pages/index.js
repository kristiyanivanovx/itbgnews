import React, {useEffect, useState} from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import Header from '../components/Header';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import {getEnvironmentInfo} from '../utilities/common';
import InfiniteScroll from 'react-infinite-scroll-component';
import INDEX_PATH from '../next.config';
import useCookie from 'react-use-cookie';
import Router from "next/router"

export async function getServerSideProps(context) {
  console.log(window)
  try {
    const accessToken = context.req.headers.cookie.split("; ")[0].split("=")[1]
  } catch (er) {
    Router.push("register")
  }

  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const response = await fetch(ENDPOINT + '/posts?skip=0&limit=10', {
    headers: {'Authorization': `Bearer ${accessToken}`}
  });


  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {data, ENDPOINT},
  };
}

const Home = ({data, ENDPOINT}) => {
  const [articles, setArticles] = useState(data.posts);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setHasMore(data.postsCount > articles.length);
  }, [articles, data.postsCount]);

  const getMoreArticles = async () => {
    const response = await fetch(
      ENDPOINT + `/posts?skip=${articles.length}&limit=10`,
    );

    try {
      const result = await response.json();
    } catch (er) {
      console.log(er)
      console.log(12)
    }

    if (result.status === 401) {
      console.log(1)
      router.push("register")
    }

    const {posts} = result

    setArticles((articles) => [...articles, ...posts]);
  };

  return (
    <>
      <HeadComponent currentPageName={'Всички Статии'}/>
      <div className={'container'}>
        <div className={'col'}>
          <Header/>
        </div>
        <div className={'col'}>
          <SideNav/>
          <main className={'articles'}>
            <InfiniteScroll
              dataLength={articles.length}
              next={getMoreArticles}
              hasMore={hasMore}
              loader={<h4>Зареждане...</h4>}
              endMessage={
                <p className={'center'}>Това са всичките налични статии!</p>
              }
            >
              {articles.map((article, index) => (
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
                />
              ))}
            </InfiniteScroll>
          </main>
        </div>
      </div>
    </>
  );
};

Home.getLayout = getDefaultLayout;

export default Home;
