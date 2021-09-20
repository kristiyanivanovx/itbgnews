import Header from '../components/Header';
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import FormContainer from '../components/FormContainer';
import SideNav from '../components/SideNav';
import {
  CREATED_RESPONSE_CODE,
  getEnvironmentInfo,
  JWT_ACCESS_TIME,
} from '../utilities/common';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Modal from '../components/Modal';
import withTokens from '../helpers/withTokens';
import isTokenValid from '../utilities/isTokenValid';
import renewToken from '../utilities/refreshToken';
import jwt from 'jsonwebtoken';
import requireAuthentication from '../helpers/withAuth';

export const getServerSideProps = requireAuthentication((context) => {
  // Your normal `getServerSideProps` code here

  return {
    props: {},
  };
});

const CreateBase = () => {
  const router = useRouter();
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState(null);

  // todo: add checks and error validation
  const checkResponse = (response) => {
    console.log('response');
    console.log(response);

    if (response.status === CREATED_RESPONSE_CODE) {
      setModalMessage(() => 'Новината беше успешно създадена!');
      toggleModal();

      setTimeout(async () => await router.push('/'), 1000);
    }
  };

  function toggleModal() {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
    console.log(shouldDisplay);
  }

  const submitForm = async () => {
    let isValid = isTokenValid(cookies.accessToken);

    // presumably we have the userId in jwt
    console.log(jwt.decode(cookies.accessToken));
    console.log(jwt.decode(cookies.accessToken).sub);
    setUserId(() => jwt.decode(cookies.accessToken).sub);

    // if token is valid, generate a new one
    if (!isValid || !userId) {
      let newAccessToken = renewToken(ENDPOINT, userId);
      console.log('newAccessToken');
      console.log(newAccessToken);
      setCookie('accessToken', newAccessToken, {
        path: '/',
        maxAge: JWT_ACCESS_TIME,
      });
    }

    let authorId = userId;
    let jsonData = JSON.stringify({ text, url, authorId });

    const response = await fetch(ENDPOINT + '/posts/create', {
      method: 'POST',
      body: jsonData,
      headers: {
        Authorization: `Bearer ${cookies.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // todo: check for errors аnd set them
    console.log(response.status);
    // setErrors(() => result);
    checkResponse(response);
  };

  return (
    <div className="container">
      <HeadComponent currentPageName={'Създай Статия'} />
      <Header />
      <div className={'col'}>
        <SideNav />
        <FormContainer>
          <Modal
            text={modalMessage}
            shouldDisplay={shouldDisplay}
            toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
          />
          <FormTitle text={'Създай Статия'} />
          <Form>
            <Input
              onChange={(e) => setText(e.target.value)}
              type={'text'}
              placeholder={'Заглавие'}
            />
            <Input
              onChange={(e) => setUrl(e.target.value)}
              type={'url'}
              placeholder={'Линк'}
            />
            <Button onClick={async () => await submitForm()} text={'Създай'} />
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

let Create = withTokens(CreateBase);
Create.getLayout = getDefaultLayout;

export default Create;