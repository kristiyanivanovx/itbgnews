import Image from 'next/image';
import logo from '../../public/logo.png';
import styles from '../../styles/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileNav from '../nav/MobileNav';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Http from '../../utilities/service/http';

const Header = ({ shouldHideSearchBar }) => {
  const ENDPOINT = useSelector((state) => state.infrastructure.endpoint);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const http = useMemo(() => new Http(), []);

  let icon = shouldDisplay ? faTimes : faBars;

  const toggleNavigation = () => {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  };

  useEffect(() => {
    if (searchTerm) {
      http
        .get('/posts/search?searchTerm=' + searchTerm, false, true, null)
        .then((data) => {
          setResults(() => data.posts);
        });
    } else {
      setResults(() => []);
    }
  }, [ENDPOINT, http, router, searchTerm]);

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
        <div className={styles.predictions}>
          {results?.map((post, index) => (
            <div className={styles.prediction} key={index}>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
