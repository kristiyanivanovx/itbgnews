import Image from 'next/image';
import logo from '../public/logo.png';
import styles from '../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileNav from './MobileNav';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getEndpoint } from '../utilities/common';
import { useRouter } from 'next/router';

const Header = ({ shouldHideSearchBar }) => {
  const ENDPOINT = getEndpoint();
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  let icon = shouldDisplay ? faTimes : faBars;

  const toggleNavigation = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  // todo: set search term to be query parameter
  const handleChange = (newTerm) => {
    setSearchTerm(() => newTerm);
  };

  useEffect(() => {
    if (searchTerm) {
      fetch(ENDPOINT + '/posts/search?searchTerm=' + searchTerm)
        .then((data) => data.json())
        .then((data) => {
          setResults(() => data.posts);
        });
    } else {
      setResults(() => []);
    }
  }, [ENDPOINT, router, searchTerm]);

  return (
    <>
      <div className={styles.site__header}>
        <header className={styles.header__main}>
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
          ) : shouldHideSearchBar ? null : (
            <div
              className={
                results?.length > 0
                  ? `${styles.search__bar} ${styles.search__bar__edges}`
                  : styles.search__bar
              }
            >
              <FontAwesomeIcon
                className={styles.icon__search}
                icon={faSearch}
              />
              <input
                onChange={(e) => handleChange(e.target.value)}
                className={styles.search__bar__input}
              />
            </div>
          )}
        </header>
        <>
          <div className={styles.predictions}>
            {results?.map((post) => (
              <>
                <div className={styles.prediction}>
                  <Link
                    key={post._id}
                    href={{
                      pathname: '/view',
                      query: { name: post.text, postId: post._id },
                    }}
                  >
                    <a>{post.text}</a>
                  </Link>
                </div>
                {/*<br />*/}
              </>
            ))}
          </div>
        </>
      </div>
    </>
  );
};

export default Header;
