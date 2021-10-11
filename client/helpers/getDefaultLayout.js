import React from 'react';
import RootContainer from '../components/RootContainer';
import Footer from '../components/Footer';
import CakeContainer from '../components/CakeContainer';
import { Provider } from 'react-redux';
import store from '../components/redux/store';

const getDefaultLayout = (page) => {
  return (
    <Provider store={store}>
      <RootContainer>
        <CakeContainer />
        {page}
        <Footer />
      </RootContainer>
    </Provider>
  );
};

export default getDefaultLayout;
