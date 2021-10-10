import React, { useReducer } from 'react';
import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import commentsReducer, { initialState } from '../reducers/commentsReducer';
config.autoAddCss = false;

// export const ArticlesContext = React.createContext([]);
// export const CommentsContext = React.createContext(0);

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  // return getLayout(<Component {...pageProps} />);
  const getLayout = Component.getLayout || ((page) => page);

  // const [count, dispatch] = useReducer(commentsReducer, initialState);

  return getLayout(
    // <ArticlesContext.Provider value={[]}>
    //   <CommentsContext.Provider
    //     value={{ countState: count, commentDispatch: dispatch }}
    //   >
    <Component {...pageProps} />,
    // </CommentsContext.Provider>
    // </ArticlesContext.Provider>,
  );
}

export default MyApp;
