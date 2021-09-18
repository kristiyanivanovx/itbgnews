import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { useCookies } from 'react-cookie';
import { getEnvironmentInfo } from '../utilities/common';
import Article from '../components/Article';
import InfiniteScroll from 'react-infinite-scroll-component';
import MY_PROFILE_PATH from '../next.config';

export async function getServerSideProps(context) {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();

  const response = await fetch(ENDPOINT + '/posts?skip=0&limit=10');
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, ENDPOINT },
  };
}

const MyProfile = ({ data, ENDPOINT }) => {
  const [articles, setArticles] = useState(data.posts);
  const [hasMore, setHasMore] = useState(true);

  const [confirmation, setConfirmation] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'accessToken',
  ]);

  // todo: critical: do not hardcode value
  const userId = '6146239ddb68b22e424946c6';

  // logout
  const triggerLogoutConfirmation = async (e) => {
    setConfirmation((confirmation) => confirmation + 1);
    await submitForm();

    // todo: improve logout
    // if user has clicked more than one time, remove the cookies
    // if (confirmation > 1) { await submitForm(); /* await Router.push('/'); */ }
  };

  // todo: improve cookie sending
  const submitForm = async () => {
    const response = await fetch(ENDPOINT + '/logout', {
      method: 'POST',
      cookies: document.cookie,
    });

    let result = await response.json();
    console.log(result);

    // setErrors(() => result.data);
    // await checkResult(result);
  };

  // if user doesnt have cookies, make him login
  // temporarily commented out
  // todo: improve checks, use getServerSideProps / hoc
  // useEffect(() => {
  //   // if (!cookies || !router) { return; }
  //
  //   const { refreshToken, accessToken } = cookies;
  //   // if (refreshToken === undefined || accessToken === undefined) {
  //   //   router.push('/login');
  //   // }
  // }, [cookies, router]);

  // articles
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

  // todo: upload profile image - https://codesandbox.io/s/thyb0?file=/pages/index.js:869-895
  const style = `jdenticon`;
  const randomized = userId + Math.random();
  const image = `https://avatars.dicebear.com/api/${style}/${randomized}.svg`;

  return (
    <>
      <HeadComponent currentPageName={'Моят Профил'} />
      <div className={'container'}>
        <div className={'col'}>
          <Header />
        </div>
        <div className={'col'}>
          <SideNav />
          <Profile
            triggerConfirmation={(e) => triggerLogoutConfirmation(e)}
            image={image}
            // todo: get these props dynamically
            username={'Никола'}
            bio={'Да жиевее българия.'}
            commentsCount={50}
            likesCount={1920}
            articlesCount={3}
          >
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
                  date={article.creationDate.split('T')[0]}
                  // todo: show real comments count
                  comments={index}
                  link={article.url}
                  redirectUrl={MY_PROFILE_PATH}
                />
              ))}
            </InfiniteScroll>
          </Profile>
        </div>
      </div>
    </>
  );
};

MyProfile.getLayout = getDefaultLayout;

export default MyProfile;
