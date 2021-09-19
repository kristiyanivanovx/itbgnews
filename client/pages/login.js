import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormTitle from '../components/FormTitle';
import AuthLinks from '../components/AuthLinks';
import FormContainer from '../components/FormContainer';
import Form from '../components/Form';
import HeadComponent from '../components/HeadComponent';
import getDefaultLayout from '../utilities/getDefaultLayout';
import {
  getEnvironmentInfo,
  INCORRECT_PASSWORD_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} from '../utilities/common';
import Modal from '../components/Modal';
import { useCookies } from 'react-cookie';
import Router from 'next/router';

const Login = () => {
  let [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

  function toggleModal() {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  }

  // todo: set cookies for a reasonable time
  function handleTokens(accessToken, refreshToken) {
    setCookie('accessToken', accessToken, {
      path: '/',
      maxAge: 60 * 60 * 24,
    }); // 1 day
    setCookie('refreshToken', refreshToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    }); // 30 days
  }

  const checkResult = async (result) => {
    if (result.message === USER_NOT_FOUND_ERROR_MESSAGE) {
      setModalMessage(() => 'Няма потребител с този имейл.');
      toggleModal();
    } else if (result.error === INCORRECT_PASSWORD_ERROR_MESSAGE) {
      setModalMessage(() => 'Грешна парола');
      toggleModal();
    } else {
      const { accessToken, refreshToken } = result.data;
      handleTokens(accessToken, refreshToken);

      setModalMessage(() => 'Влязохте успешно.');
      toggleModal();

      setTimeout(() => {
        Router.push('/');
      }, 2000);
    }
  };

  const submitForm = async () => {
    let jsonData = JSON.stringify({ email, password });

    const response = await fetch(ENDPOINT + '/login', {
      method: 'POST',
      body: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let result = await response.json();
    setErrors(() => result.data);

    await checkResult(result);
  };

  return (
    <>
      <HeadComponent currentPageName={'Вход'} />
      <FormContainer>
        <Modal
          text={modalMessage}
          shouldDisplay={shouldDisplay}
          toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
        />
        <FormTitle text={'Вход'} />
        <Form>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Имейл'}
            type={'text'}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Парола'}
            type={'password'}
          />
          <Button onClick={async () => await submitForm()} text={'Влез'} />

          <AuthLinks
            firstText={'Нямаш профил?'}
            secondText={'Забравена парола?'}
          />
        </Form>
      </FormContainer>
    </>
  );
};

Login.getLayout = getDefaultLayout;

export default Login;
