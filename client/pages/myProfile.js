import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Profile from '../components/Profile';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../helpers/getDefaultLayout';
import { getEndpoint } from '../utilities/common';
import Article from '../components/Article';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import requireAuthentication from '../helpers/requireAuthentication';
import jwt from 'jsonwebtoken';
import getUserToken from '../utilities/getUserToken';
import ensureValidCookie from '../utilities/ensureValidCookie';

export const getServerSideProps = requireAuthentication(async (context) => {
  const ENDPOINT = getEndpoint();

  const accessToken = getUserToken(context.req?.headers.cookie).split('=')[1];
  const userId = jwt.decode(accessToken).sub;

  const posts = await fetch(
    ENDPOINT + '/posts/by/' + userId + '?skip=0&limit=10',
  );
  const data = await posts.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const userInformation = await fetch(ENDPOINT + '/users/info/' + userId);
  const userData = await userInformation.json();

  return {
    props: {
      data,
      userId,
      userData,
      accessToken,
      ENDPOINT,
    },
  };
});

const MyProfile = ({ data, userId, userData, accessToken, ENDPOINT }) => {
  const [articles, setArticles] = useState(data.posts);
  const [hasMore, setHasMore] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  // articles
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/login');
      setShouldRedirect((prev) => !prev);
    }

    setHasMore(data.postsCount > articles.length);
  }, [articles.length, shouldRedirect, data.postsCount, router]);

  const submitLogoutForm = async () => {
    const logoutResponse = await fetch(ENDPOINT + '/logout', {
      headers: {
        authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
      method: 'POST',
    });

    const cookieRemoveResponse = await fetch('/api/removeCookie', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    let result = await logoutResponse.json();
    setShouldRedirect(() => true);
    // if (result.status === SUCCESS_RESPONSE_CODE) { }
  };
  const getPicture = async () => {
    const getPictureResponce = await fetch(`${ENDPOINT}/posts/my-profile/image`, {
      method : "GET",
      headers: {
        authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
    })
  }

  getPicture()

  const getMoreArticles = async () => {
    const response = await fetch(
      ENDPOINT + '/posts/by/' + userId + `?skip=${articles.length}&limit=10`,
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
            userId = {userId}
            image={image}
            username={userData.username}
            bio={userData?.bio ?? ''}
            email={userData.email}
            commentsCount={userData.commentsCount}
            upvotesCount={userData.upvotesCount}
            articlesCount={userData.postsCount}
            userId={userId}
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
                  username={article.authorName}
                  date={article.creationDate}
                  // todo: show real comments count
                  comments={index}
                  link={article.url}
                  authorId={article.authorId}
                  userId={userId}
                  shouldDisplayEditOptions={userId === article.authorId}
                  accessToken={accessToken}
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