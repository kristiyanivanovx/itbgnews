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
import setProfilePicture from '../utilities/pictures/setProfilePicture';

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
<<<<<<< HEAD
  const getPicture = async () => {
    const getPictureResponse = await fetch(`${ENDPOINT}/my-profile/image`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${await ensureValidCookie(accessToken)}`,
      },
    });
    if(getPictureResponse.status === 200){
      const {img} = await getPictureResponse.json()
      setCurrentImage(() => img)
    }else{
      const style = `jdenticon`;
      const randomized = userId + Math.random();
      const img = `https://avatars.dicebear.com/api/${style}/${randomized}.svg`;
      setCurrentImage(() => img)
    }
  };

  useEffect()
=======
>>>>>>> origin/chris

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

  const getMoreArticles = async () => {
    const response = await fetch(
      ENDPOINT + '/posts/by/' + userId + `?skip=${articles.length}&limit=10`,
    );

    const { posts } = await response.json();
    setArticles((articles) => [...articles, ...posts]);
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
