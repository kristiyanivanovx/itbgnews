import React from 'react';
import Article from '../components/Article';
import SideNav from '../components/SideNav';
import SearchBar from '../components/SearchBar';
import Brand from '../components/Brand';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';

function Home() {
  let key = 0;
  const items = [
    <Article
      key={key}
      title={'Binary Search. ' + key}
      upvotes={9}
      username={'admin'}
      hours={5}
      comments={103}
      link={'https://it-bg.github.io/'}
      isFirstArticle={true}
    />,
  ];

  for (let i = key + 1; i < 4; i++) {
    items.push(
      <Article
        key={i}
        title={'Merge Sort. ' + i}
        upvotes={9 + i}
        username={'admin'}
        hours={5 + i}
        comments={103 + i}
        link={'https://it-bg.github.io/'}
      />,
    );
  }

  return (
    <>
      <HeadComponent currentPageName={'All Articles'} />
      <div className={'container'}>
        <div className={'col'}>
          <Brand />
          <SearchBar />
        </div>
        <div className={'col'}>
          <SideNav />
          <main className={'articles'}>{items}</main>
        </div>
      </div>
    </>
  );
}

Home.getLayout = getDefaultLayout;

export default Home;
