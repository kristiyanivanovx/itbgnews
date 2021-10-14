import React from 'react';
import RootContainer from '../../components/common/RootContainer';
import Footer from '../../components/common/Footer';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const getDefaultLayout = (page) => {
  return (
    <Provider store={store}>
      <RootContainer>
        {page}
        <Footer />
      </RootContainer>
    </Provider>
  );
};

export default getDefaultLayout;
