import React, { useEffect, useState } from 'react';
import Header from '../components/stateful/Header';
import SideNav from '../components/nav/SideNav';
import Profile from '../components/stateful/Profile';
import HeadComponent from '../components/common/HeadComponent';
import getDefaultLayout from '../utilities/layout/getDefaultLayout';
import getEndpoint from '../utilities/infrastructure/getEndpoint';
import Article from '../components/stateful/Article';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import requireAuthentication from '../utilities/auth/requireAuthentication';
import jwt from 'jsonwebtoken';
import getUserToken from '../utilities/auth/getUserToken';
import ensureValidCookie from '../utilities/auth/ensureValidCookie';
import setProfilePicture from '../utilities/image/setProfilePicture';
import getMoreArticles from '../utilities/article/getMoreArticles';
import Http from '../utilities/service/http';

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

  const pictureResponse = await fetch(ENDPOINT + '/my-profile/image/' + userId);
  const picture = await setProfilePicture(pictureResponse, userId);

  return {
    props: {
      data,
      userId,
      userData,
      accessToken,
      ENDPOINT,
      picture,
    },
  };
});

const MyProfile = ({
  data,
  userId,
  userData,
  accessToken,
  ENDPOINT,
  picture,
}) => {
  const [articles, setArticles] = useState(data.posts);
  const [hasMore, setHasMore] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentImage, setCurrentImage] = useState(picture);
  const router = useRouter();
  const http = new Http(ENDPOINT);

  // article
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/login');
      setShouldRedirect((prev) => !prev);
    }

    setHasMore(data.postsCount > articles.length);
  }, [articles.length, shouldRedirect, data.postsCount, router]);

  const submitLogoutForm = async () => {
    const token = await ensureValidCookie(accessToken);
    await http.post('/logout', false, true, true, token, null);
    await http.post('/api/removeCookie', true, false, false, token, null);

    // todo: dispatch is logged out
    setShouldRedirect(() => true);
  };

  const loadMoreArticles = async () => {
    return await getMoreArticles(
      setArticles,
      articles,
      ENDPOINT,
      `/posts/by/${userId}?skip=${articles.length}&limit=10`,
    );
  };

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
            userId={userId}
            image={currentImage}
            username={userData.username}
            bio={userData?.bio ?? ''}
            email={userData.email}
            commentsCount={userData.commentsCount}
            upvotesCount={userData.upvotesCount}
            articlesCount={userData.postsCount}
            accessToken={accessToken}
          >
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
                ? articles.map((article, index) => (
                    <Article
                      key={article._id}
                      postId={article._id}
                      isFirstArticle={index === 0}
                      title={article.text}
                      upvotes={article.upvoters.length}
                      username={article.authorName}
                      date={article.creationDate}
                      link={article.url}
                      // todo, important: show real comment count
                      comments={index}
                      accessToken={accessToken}
                      shouldDisplayEditOptions={userId === article.authorId}
                      // authorId={article.authorId}
                      // userId={userId}
                    />
                  ))
                : null}
            </InfiniteScroll>
          </Profile>
        </div>
      </div>
    </>
  );
};

MyProfile.getLayout = getDefaultLayout;

export default MyProfile;
