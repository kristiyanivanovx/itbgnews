import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
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
import jwt from 'jsonwebtoken';

const Create = () => {
  const router = useRouter();
  const [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!cookies || !router || !cookies.accessToken) {
      router.push('/login');
    }
  }, [cookies, router]);

  useEffect(() => {
    if (cookies.accessToken) {
      const res = jwt.decode(cookies.accessToken);
      setUserId(() => res.sub);

      if (userId) {
        fetch(ENDPOINT + '/token', {
          method: 'POST',
          body: JSON.stringify({ userId }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((data) => data.json())
          .then((data) => {
            if (data.accessToken) {
              setCookie('accessToken', data.accessToken, {
                path: '/',
                maxAge: JWT_ACCESS_TIME,
              });
              setUserId(() => jwt.decode(cookies.accessToken).sub);
            }
          });
      }
    }
  }, [cookies.accessToken, ENDPOINT, userId, setCookie]);

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
    console.log('sus user id');
    console.log(userId);

    let authorId = userId;
    let jsonData = JSON.stringify({ text, url, authorId });

    console.log('jsonData');
    console.log(jsonData);

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

Create.getLayout = getDefaultLayout;

export default Create;