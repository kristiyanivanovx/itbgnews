import React from 'react';
import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const ArticlesContext = React.createContext([]);

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />;

  const getLayout = Component.getLayout || ((page) => page);
  // return getLayout(<Component {...pageProps} />);

  return getLayout(
    // <ArticlesContext.Provider value={[]}>
    <Component {...pageProps} />,
    // </ArticlesContext.Provider>,
  );
}

export default MyApp;
