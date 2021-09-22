import React from 'react';
import RootContainer from '../components/RootContainer';
import Footer from '../components/Footer';

const getDefaultLayout = (page) => {
  return (
    <RootContainer>
      {page}
      <Footer />
    </RootContainer>
  );
};

export default getDefaultLayout;
