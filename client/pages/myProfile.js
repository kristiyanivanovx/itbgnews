import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import { useCookies } from 'react-cookie';
import {
  JWT_ACCESS_TIME,
  SUCCESS_RESPONSE_CODE,
  getEnvironmentInfo,
  hasAccess,
} from '../utilities/common';
import Article from '../components/Article';
import InfiniteScroll from 'react-infinite-scroll-component';
import MY_PROFILE_PATH from '../next.config';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';

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
  const [shouldAuth, setShouldAuth] = useState(true);
  const [articles, setArticles] = useState(data.posts);
  const [hasMore, setHasMore] = useState(true);
  const [confirmation, setConfirmation] = useState(1);
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  let user;
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

  // articles
  useEffect(() => {
    if (confirmation > 1) {
      if (!cookies.refreshToken) {
        router.push('/');
      }
    } else {
      if (!cookies.refreshToken) {
        router.push('/login');
      }
    }

    setHasMore(data.postsCount > articles.length);
  }, [
    articles.length,
    confirmation,
    cookies.refreshToken,
    data.postsCount,
    router,
  ]);

  // todo: critical: do not hardcode value
  const userId = '6146239ddb68b22e424946c6';

  // logout
  const triggerLogoutConfirmation = async (e) => {
    setConfirmation((confirmation) => confirmation + 1);
    await submitLogoutForm();

    // todo: improve logout
    // if user has clicked more than one time, remove the cookies
    // if (confirmation > 1) { await submitForm(); /* await Router.push('/'); */ }
  };

  // todo: improve cookie sending
  const submitLogoutForm = async () => {
    const response = await fetch(ENDPOINT + '/logout', {
      headers: { authorization: `Bearer ${cookies.accessToken}` },
      method: 'POST',
    });

    let result = await response.json();
    console.log(result);
    removeCookie('accessToken');
    removeCookie('refreshToken');

    if (result.status === SUCCESS_RESPONSE_CODE) {
    }
  };

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
