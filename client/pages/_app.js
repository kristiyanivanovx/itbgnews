import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { CookiesProvider } from 'react-cookie';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />;

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>,
  );
}

export default MyApp;
