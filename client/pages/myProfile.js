import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import { getEndpoint } from '../utilities/common';
import Article from '../components/Article';
import InfiniteScroll from 'react-infinite-scroll-component';
import MY_PROFILE_PATH from '../next.config';
import { useRouter } from 'next/router';
import requireAuthentication from '../helpers/requireAuthentication';
import jwt from 'jsonwebtoken';
import isTokenExpired from '../utilities/isTokenExpired';
import renewToken from '../utilities/refreshToken';
import getUserToken from '../utilities/getUserToken';
import renewCookie from '../utilities/renewCookie';

export const getServerSideProps = requireAuthentication(async (context) => {
  const ENDPOINT = getEndpoint();
  const response = await fetch(ENDPOINT + '/posts?skip=0&limit=10');
  const data = await response.json();

  let accessToken = getUserToken(context.req?.headers.cookie).split('=')[1];

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
});

const MyProfile = ({ data, accessToken, ENDPOINT }) => {
  const [userId, setUserId] = useState(null);
  const [articlesCount, setArticlesCount] = useState(data.postsCount);
  const [articles, setArticles] = useState(data.posts);
  const [hasMore, setHasMore] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  // articles
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/login');
    }

    setHasMore(data.postsCount > articles.length);
  }, [articles.length, shouldRedirect, data.postsCount, router]);

  // todo: improve cookie sending
  const submitLogoutForm = async () => {
    let userId = jwt.decode(accessToken).sub;
    let isExpired = isTokenExpired(accessToken);

    let updatedToken = isExpired
      ? (await renewToken(ENDPOINT, userId)).accessToken
      : accessToken;

    isExpired ? await renewCookie(updatedToken) : null;

    const logoutResponse = await fetch(ENDPOINT + '/logout', {
      headers: { authorization: `Bearer ${updatedToken}` },
      method: 'POST',
    });

    const cookieRemoveResponse = await fetch('/api/removeCookie', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let result = await cookieRemoveResponse.json();
    setShouldRedirect(() => true);
    // if (result.status === SUCCESS_RESPONSE_CODE) { }
  };

  // todo: get the articles by this user
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
            triggerConfirmation={async () => await submitLogoutForm()}
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
