import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import FormTitle from '../components/FormTitle';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import HeadComponent from '../components/HeadComponent';
import Modal from '../components/Modal';
import getDefaultLayout from '../utilities/getDefaultLayout';
import {
  EXISTING_USER_ERROR_CODE,
  getEnvironmentInfo,
  SUCCESSFUL_REGISTRATION_MESSAGE,
  JWT_ACCESS_TIME,
  JWT_REFRESH_TIME,
} from '../utilities/common';
import Router from 'next/router';
import { useCookies } from 'react-cookie';

const Register = () => {
  let [ENV, isProduction, ENDPOINT] = getEnvironmentInfo();

  const [modalMessage, setModalMessage] = useState('');
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

  // TODO CRITICAL : add option to just login

  // todo: set tokens for a reasonable time
  function handleTokens(accessToken, refreshToken) {
    setCookie('accessToken', accessToken, {
      path: '/',
      maxAge: JWT_ACCESS_TIME,
    });
    setCookie('refreshToken', refreshToken, {
      path: '/',
      maxAge: JWT_REFRESH_TIME,
    });

    console.log(cookies.accessToken);
    console.log(cookies.refreshToken);
  }

  function toggleModal() {
    setShouldDisplay((shouldDisplay) => !shouldDisplay);
  }

  const checkResponse = (result) => {
    if (result.message === SUCCESSFUL_REGISTRATION_MESSAGE) {
      setModalMessage(() => 'Регистрирахте се успешно!');

      let { accessToken, refreshToken } = result.data;
      handleTokens(accessToken, refreshToken);

      toggleModal();
      setTimeout(() => Router.push('/login'), 2000);
    } else if (result.data?.code === EXISTING_USER_ERROR_CODE) {
      setModalMessage(() => 'Потребител с това име или имейл вече съществува.');

      toggleModal();
    }
  };

  const submitForm = async () => {
    let jsonData = JSON.stringify({ username, email, password });

    const response = await fetch(ENDPOINT + '/register', {
      method: 'POST',
      body: jsonData,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let result = await response.json();
    setErrors(() => result);

    checkResponse(result);
  };

  return (
    <>
      <HeadComponent currentPageName={'Регистрация'} />
      <FormContainer>
        <Modal
          text={modalMessage}
          shouldDisplay={shouldDisplay}
          toggleModal={(shouldDisplay) => setShouldDisplay(!shouldDisplay)}
        />
        <FormTitle text={'Регистрация'} />
        <Form>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            type={'text'}
            placeholder={'Име'}
            errorMessage={errors.errorUsername}
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type={'text'}
            placeholder={'Имейл'}
            errorMessage={errors.errorEmail}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type={'password'}
            placeholder={'Парола'}
            errorMessage={errors.errorPassword}
          />
          <Button
            text={'Регистрация'}
            onClick={async () => await submitForm()}
          />
        </Form>
      </FormContainer>
    </>
  );
};

Register.getLayout = getDefaultLayout;

export default Register;
