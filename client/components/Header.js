import Image from 'next/image';
import logo from '../public/logo.png';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileNav from './MobileNav';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getEnvironmentInfo } from '../utilities/common';

const Header = () => {
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  let icon = shouldDisplay ? faTimes : faBars;

  const toggleNavigation = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  const handleChange = (newTerm) => {
    setSearchTerm(() => newTerm);
  };

  let data = null;
  useEffect(() => {
    (async () => {
      const response = await fetch(
        ENDPOINT + '/posts/search?searchTerm=' + searchTerm,
      );

      const json = await response.json();
      console.log(json.posts);
      setResults(() => json.posts);
    })();
  }, [ENDPOINT, data, searchTerm]);

  return (
    <>
      <header className={`${styles.site__header} col`}>
        <FontAwesomeIcon
          onClick={() => toggleNavigation()}
          className={styles.icon__burger}
          icon={icon}
        />
        <div className={styles.brand}>
          <div className={styles.brand__logo}>
            <Image src={logo} alt={'logo'} />
          </div>
          <div className={styles.brand__title}>
            <Link href={'/'}>
              <a>IT-BG News</a>
            </Link>
          </div>
        </div>

        {shouldDisplay ? (
          <MobileNav />
        ) : (
          <div className={styles.search__bar}>
            <FontAwesomeIcon className={styles.icon__search} icon={faSearch} />
            <input
              onChange={(e) => handleChange(e.target.value)}
              className={styles.search__bar__input}
            />
          </div>
        )}
      </header>

      <>
        {results?.map((post) => (
          <>
            <Link
              key={post._id}
              href={{ pathname: '/view', query: { post_id: post._id } }}
            >
              <a>{post.text}</a>
            </Link>
            <br />
          </>
        ))}
      </>

      {/*{results?.map((post) => {*/}
      {/*  console.log('da');*/}
      {/*  console.log(post);*/}
      {/*})}*/}
    </>
  );
};

export default Header;
